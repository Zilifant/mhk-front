// multi-selector hook

import { useState, useCallback } from 'react';

const reduceToIds = (selTracker) => {
  return selTracker.reduce((acc, item) => {
    if (item.isSelected) acc.push(item.id);
    return acc;
  }, []);
};

const initSelTracker = (items) => {
  if (!items) return console.log(`initSelTracker Error: 'items' = ${items}`)
  const initState = items.map(item => {
    return {id: item.id, isSelected: false };
  });
  return initState
};

const extractId = (item) => {
  if (typeof(item) === 'string') return item;
  if ((typeof(item) === 'object') && !!item.id) return item.id;
  console.log('extractId Error: returning null');
  return null;
};

export const useMultiSelector = ({items, min=1, max=1}) => {

  const [minReached, setMinReached] = useState(false);
  const [maxReached, setMaxReached] = useState(false);
  const [selTracker, setSelTracker] = useState(initSelTracker(items));

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

  const selectItemHandler = (item, cbArray, instaConfirm, icCbArray, icResetTracker) => {
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

  const selectItem = (obj) => {

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

  function checkById(id) {
    const trackedItem = selTracker.find(item => item.id === id);
    if (!trackedItem) return console.log(`Err! trackedItem falsy`);
    return trackedItem.isSelected;
  };

  function checkByIndex(idx) {
    if ((selTracker.length-1) < idx) return console.log(`Err! selTracker too short`);
    if (selTracker[idx] === undefined) return console.log(`Err! item at idx undefined`);
    return selTracker[idx].isSelected;
  };

  const amISelected = (i) => {
    if (!i && i !== 0) return console.log(`Err! i is falsy`);
    if (selTracker.length === 0) return console.log(`Err! selTracker empty`);
    return (typeof(i) === 'string') ? checkById(i) : checkByIndex(i);
  };

  const amIEnabled = (i) => {
    if (maxReached && !amISelected(i)) return false;
    return true;
  };

  return {
    selectItem,
    selectItemHandler,
    confirmSelection,
    amISelected, amIEnabled,
    updateTracker,
    minReached, maxReached,
    selTracker
  };
};