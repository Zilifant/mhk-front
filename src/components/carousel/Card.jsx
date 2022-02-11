// Carousel Card //

import React, { memo } from 'react';

const Card = memo(({ card }) => {

  return (
    <div className='carousel-card'>
      <img
        className='carousel-card-img'
        id={card.id}
        src={`./cards/${card.id}.png`}
        title={card.title}
        alt={card.alt}
      />
    </div>
  );
});

export default memo(Card);
