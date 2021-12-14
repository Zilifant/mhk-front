// Multi-Selector Hook //
// Used for tracking selections of multiple items and also confirming the
// selection, especially in cases where a min/max number of selections is
// required/allowed.
// Expects tracked items to be objects with unique `id` properties.
// Features:
// - Can set up to automatically confirm selections or wait for a separate
//   'confirm' event.
// - Can take a callback function to use on confirming a selection that brings
//   in outside args as well as selected items stored in the hook.

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

  // selectItemHandler args:
  // - item: Selected/deselected item.
  // - cbArray: Callback array, including callback function (first element) and
  //   array of args (second element) (optional).
  // - instaConfirm: Should selection be instantly confirmed (optional bool).
  // - icCbArray: Callback array if instaConfirming (optional).
  // - icResetTracker: Should tracker reset if instaConfirming (optonal bool).
  // TO DO: Convert this to an object for named arguments.
  const selectItemHandler = (
    item,
    cbArray,
    instaConfirm,
    icCbArray,
    icResetTracker
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

    const item = obj.item;
    const callback = obj.cb[0];
    const args = obj.cb[1];
    const instaConfirm = obj.instaConfirm;
    const icCallback = obj.icCb[0];
    const icArgs = obj.icCb[1];
    const icResetTracker = obj.icResetTracker;

    const id = extractId(item);
    const updSel = selTracker.map(itm => {
      if (itm.id !== id) return itm;
      return { id: itm.id, isSelected: !itm.isSelected };
    });
    setSelTracker(updSel);

    const numSelected = updSel.filter(itm => itm.isSelected === true).length;
    setMinReached(numSelected >= min);
    setMaxReached(numSelected === max);

    if (!!callback) return callback(...args);
    if (!!instaConfirm) {
      return confirmSelection({cb:[icCallback, icArgs], icResetTracker})
    };
  };

  const confirmSelection = ({cb:[callback, ...args], resetTracker}) => {
    const ids = reduceToIds(selTracker);

    if (resetTracker) {
      setSelTracker(initSelTracker(items));
      setMinReached(false);
      setMaxReached(false);
    };

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