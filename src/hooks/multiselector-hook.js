import {
  useState
} from 'react';

const reduceToIds = (selTracker) => {
  return selTracker.reduce((acc, item) => {
    if (item.isSelected) acc.push(item.id);
    return acc;
  }, []);
};

const initSelTracker = (items) => items.map(item => {
  return {id: item.id, isSelected: false };
});

const extractId = (item) => {
  if (typeof(item) === 'string') return item;
  if ((typeof(item) === 'object') && !!item.id) return item.id;
  console.error('extractId Error: returning null');
  return null;
};

export const useMultiSelector = ({items, min=1, max=1}) => {
  console.log('useMultiSelector');

  const [minReached, setMinReached] = useState(false)
  const [maxReached, setMaxReached] = useState(false);
  const [selTracker, setSelTracker] = useState(initSelTracker(items))

  const selectItem = (obj) => {

    const item = obj.item;
    const callback = obj.cb[0];
    const args = obj.cb[1];

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
  };

  const confirmSelection = ({payload, cb:[callback, ...args], resetTracker}) => {
    const ids = reduceToIds(selTracker);

    if (resetTracker) {
      setSelTracker(initSelTracker(items));
      setMinReached(false);
      setMaxReached(false);
    };

    if (!!payload) {
      const selectedPayload = payload.filter(item => ids.some(id => id === item.id));
      return callback(selectedPayload, ...args);
    } else {
      return callback(ids, ...args);
    };
  };

  const checkIfSelected = (i) => {
    if (typeof(i) === 'string') return selTracker.find(item => item.id === i).isSelected;
    return selTracker[i].isSelected;
  };

  return {
    selectItem,
    confirmSelection,
    checkIfSelected,
    minReached,
    maxReached,
    selTracker
  };
};