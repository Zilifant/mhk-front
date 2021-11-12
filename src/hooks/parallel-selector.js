// parallel selector hook

import { useState } from 'react';

function areMinSelected(selTracker) {
  if (Object.values(selTracker).includes(null)) return false;
  return true;
};

function initSelection(types) {
  if (!types) return console.log(`initParTrack Err: 'types' = ${types}`);
  if (types.length < 1) return console.log(`initParTrack Err: 'types' is empty`);
  let initState = {};
  types.forEach(type => {
    initState = {
      ...initState,
      ...{[type]: null}
    };
  });
  return initState
};

const reduceToIds = (sel) => {
  let arr = [];
  for (let p in sel) arr.push(sel[p].id);
  return arr;
};

export const useParallelSelector = (types) => {

  const [selTracker, setSelTracker] = useState(initSelection(types));
  const [minSelected, setMinSelected] = useState(false);

  const selectHandler = (item) => {
    const alreadySelected = item.id === selTracker[item.type]?.id;
    alreadySelected ? unselect(item) : select(item);
    setMinSelected(areMinSelected(selTracker));

    function select(item) {
      const newSel = selTracker;
      newSel[item.type] = item;
      setSelTracker({...newSel});
    };

    function unselect(item) {
      const newSel = selTracker;
      newSel[item.type] = null;
      setSelTracker({...newSel});
    };
  };

  const submitSelection = ({cb:[callback, ...args], reset}) => {
    const ids = reduceToIds(selTracker);

    if (reset) {
      setSelTracker(initSelection(types));
      setMinSelected(false);
    };

    return callback(ids, ...args);
  };

  return {
    selTracker,
    minSelected,
    selectHandler,
    submitSelection
  };
};