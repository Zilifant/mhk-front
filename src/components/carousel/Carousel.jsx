// Carousel //

import React, { useState } from 'react';
import Card from './Card';
import SVGIcon from '../shared/SVGIcon';
import '../../styles/carousel.scss';

// Step forward/backward.
const CarouselBtn = ({ spinCarousel, forward }) => (
  <button
    className={`carousel-btn ${forward ? 'forward' : 'back'}`}
    onClick={() => spinCarousel(forward ? 1 : -1)}
  >
    <SVGIcon icon={'chevronRight'} />
  </button>
);

// Jump to any item. Also displays title of current item.
// FIX ME: Current animation doesn't work when jumping more than one step.
const MiniMapBtn = ({item, idx, jumpToItem, disabled}) => (
  <button
    key={idx}
    id={idx}
    className={`carousel-minimap-btn ${item.type}`}
    onClick={() => jumpToItem(idx)}
    disabled={disabled}
  >
    {item.title}
  </button>
);

// items: array of objects containing basic data for each item.
// numFlanking: how many items to render of each side of the center item.
// startAt: index of the item to show at center when component first renders.
const Carousel = ({ items, numFlanking = 3, startAt = 0 }) => {

  // An array containing the indexes/ids (these are identical) of the rendered items.
  // Note: Technically not all items are visible; currently I render one more than I intend the user to see on each side, to prevent pop-in.
  // FIX ME: There is still pop-in on Firefox :(
  const [visIndexes, setVisIndexes] = useState(initVisIndexes());

  // Calculates size of array based on numFlanking, then adds indexes of starting items.
  // Note: while loop counts from a negative number (-2 if startAt is 0); i is then used to
  // get the index of the item relative to the startAt.
  function initVisIndexes() {
    const totalNumVis = (numFlanking * 2) + 1;
    let arr = [];
    let i = 0 - numFlanking;
    while (i < totalNumVis - numFlanking) {
      arr.push(adjustWrappingIdx(startAt + i));
      i++;
    };
    return arr;
  };

  // Convert to the correct index when wrapping from start/end of the list.
  function adjustWrappingIdx(idx) {
    if (idx > items.length-1) return idx - items.length;
    if (idx < 0) return idx + items.length;
    return idx;
  };

  // steps will be a positive int for forward, negative int for backward;
  function spinCarousel(steps) {
    const newIndexes = visIndexes.map(idx => adjustWrappingIdx(idx + steps));
    setVisIndexes(newIndexes);
  };

  // Apply css classes. (These classes are not currently being used.)
  function cssClass(idx) {
    const position = `item-${visIndexes.indexOf(visIndexes.find(i => i === idx))}`;
    if (visIndexes[numFlanking] === idx) return `current ${position}`;
    return position;
  };

  // Used by MiniMapBtn.
  const jumpToItem = (idx) => spinCarousel(idx - visIndexes[numFlanking]);

  return (<>
    <div className='carousel-main'>
      <CarouselBtn spinCarousel={spinCarousel} />
      <ul className='carousel-list'>
        {visIndexes.map((idx, i) => (
          <li
            key={idx}
            className={`carousel-item ${cssClass(idx)}`}
          >
            <Card card={items[idx]} idx={i} />
          </li>
        ))}
      </ul>
      <CarouselBtn spinCarousel={spinCarousel} forward />
    </div>
    <div className='carousel-minimap'>
      {items.map((item, idx) => (
        <MiniMapBtn
          key={idx}
          idx={idx}
          item={item}
          jumpToItem={jumpToItem}
          disabled={idx === visIndexes[numFlanking]}
        />
      ))}
    </div>
  </>);
};

export default Carousel;
