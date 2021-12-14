// Multi-Selector Hook //
// Used for tracking selections of multiple items and also confirming the
// selection, especially in cases where a min/max number of selections is
// required/allowed.
// Expects tracked items to be objects with unique `id` properties.
// Features:
// - Can set up to automatically confirm selections or wait for a separate
//   'confirm' event.
// - Can take callback functions to execute whenever an item is selected and/or
//   when a selection is confirmed. Callback functions take the selected item
//   (if called on selection) or an array of all selected items (if called on
//   confirm) as an arg in addition to any args passed in with the callback.

// TO DO: Allow tracked items to be strings as well.
// TO DO: Refactor error handling to use proper error objects instead of only
// console.logs.

import { useState, useCallback } from 'react';

// Utility Functions //

// Create the object that tracks selected items.
function initSelTracker(items) {
  if (!items) return console.log(`initSelTracker Error: 'items' = ${items}`)
  const initState = items.map(item => {
    return {id: item.id, isSelected: false };
  });
  return initState
};

// Reduce selection tracker to array containing ids (strings) of selected items.
function reduceToIds(selTracker) {
  return selTracker.reduce((acc, item) => {
    if (item.isSelected) acc.push(item.id);
    return acc;
  }, []);
};

// If item is string, return item. If item is an object that contains an `id`
// property, return the id, else log error message and return `null`.
function extractId(item) {
  if (typeof(item) === 'string') return item;
  if ((typeof(item) === 'object') && !!item.id) return item.id;
  console.log('extractId Error: returning null');
  return null;
};

function checkById(selTracker, id) {
  const trackedItem = selTracker.find(item => item.id === id);
  if (!trackedItem) return console.log(`Err! trackedItem falsy`);
  return trackedItem.isSelected;
};

function checkByIndex(selTracker, idx) {
  if ((selTracker.length-1) < idx) return console.log(`Err! selTracker too short`);
  if (selTracker[idx] === undefined) return console.log(`Err! item at idx undefined`);
  return selTracker[idx].isSelected;
};

export const useMultiSelector = ({items, min=1, max=1}) => {

  const [selTracker, setSelTracker] = useState(initSelTracker(items));
  // Min selected items needed to submit selection.
  const [minReached, setMinReached] = useState(false);
  // Max items that can be selected.
  const [maxReached, setMaxReached] = useState(false);

  // Select/Deselect Item //

  const selectItemHandler = (
    item, cbArray, instaConfirm, icCbArray, icResetTracker
    // Args; for optional values, if none, pass a falsy value, ideally `null`.
    // - item: Selected/deselected item.
    // - cbArray: Callback array, includes function to be called on selection
    //   (first element) and array of args (second element) (optional).
    // - instaConfirm: Should selection be instantly confirmed (optional bool).
    // - icCbArray: Callback array, if instaConfirming with a callback function
    //   (optional).
    // - icResetTracker: Should tracker reset if instaConfirming (optonal bool).
    // TO DO: Convert this to an object for named arguments.
    // TO DO: Refactor to eliminate need for separate cb and icCb.
  ) => {
    let callback, args, icCallback, icArgs;

    if (!!cbArray) {
      callback = cbArray[0];
      args = cbArray[1];
    };

    if (!!instaConfirm) {
      icCallback = icCbArray[0];
      icArgs = icCbArray[1];
    };

    const obj = {
      item: item,
      cb:[callback, args],
      instaConfirm: instaConfirm,
      icCb:[icCallback, icArgs],
      icResetTracker: icResetTracker
    };

    return selectItem(obj);
  };

  // Only used internally, by `selectItemHandler`. Kept in hook for readability.
  function selectItem(obj) {

    // Set a bunch of variables for readability.
    const item = obj.item;
    const callback = obj.cb[0];
    const args = obj.cb[1];
    const instaConfirm = obj.instaConfirm;
    const icCallback = obj.icCb[0];
    const icArgs = obj.icCb[1];
    const icResetTracker = obj.icResetTracker;

    // Get id of selected item.
    const id = extractId(item);

    // Update the selection tracker state.
    const updSel = selTracker.map(itm => {
      if (itm.id !== id) return itm;
      return { id: itm.id, isSelected: !itm.isSelected };
    });
    setSelTracker(updSel);

    // Update min/maxReached states if necessary.
    const numSelected = updSel.filter(itm => itm.isSelected === true).length;
    setMinReached(numSelected >= min);
    setMaxReached(numSelected === max);

    // If callback given, call it with args array spread.
    if (!!callback) return callback(...args);
    // If instaConfirming, confirm selection.
    if (!!instaConfirm) {
      return confirmSelection({cb:[icCallback, icArgs], icResetTracker})
    };
  };

  // Expects an object with two properties:
  // 1) `cb`: an array containing a function and (optionally) an array of args.
  // 2) `resetTracker`: an optional boolean that defaults to `false`.
  const confirmSelection = ({cb:[callback, ...args], resetTracker}) => {
    const ids = reduceToIds(selTracker);

    // Optionally reset the tracker.
    if (resetTracker) {
      setSelTracker(initSelTracker(items));
      setMinReached(false);
      setMaxReached(false);
    };

    // Call the callback. First arg is an array of (the ids of) selected items,
    // followed by any additional given args.
    return callback(ids, ...args);
  };

  // Add/remove items to the tracker.
  // TO DO: This is overly complex; refactor.
  const updateTracker = useCallback((newitems) => {
    const updItems = initSelTracker(newitems);
    const updTracker = updItems.map(item => {
      const existingItem = selTracker.find(itm => itm.id === item.id);
      if (!!existingItem) return existingItem;
      return item;
    });
    setSelTracker(updTracker);
    const numSelected = updTracker.filter(itm => itm.isSelected === true).length;
    setMinReached(numSelected >= min);
    setMaxReached(numSelected === max);
  },[selTracker, min, max]);

  // Two checks for UI element appearance and functionality:

  // Check if an item is selected. Can lookup by item's id or index.
  const amISelected = (i) => {
    if (!i && i !== 0) return console.log(`Err! i is falsy`);
    if (selTracker.length === 0) return console.log(`Err! selTracker empty`);
    return (typeof(i) === 'string') ? checkById(selTracker, i)
                                    : checkByIndex(selTracker, i);
  };

  // Check if an item can be selected or deselected, i.e. if the UI
  // button/toggle associated with that item should be enabled.
  const amIEnabled = (i) => {
    if (maxReached && !amISelected(i)) return false;
    return true;
  };

  return {
    selectItemHandler,
    confirmSelection,
    amISelected,
    amIEnabled,
    updateTracker,
    minReached,
    maxReached,
    selTracker
  };
};