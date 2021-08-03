import React, {
  // useState
} from 'react';
import Card from './Card';
import '../../../../styles/cards.css';

const Cards = ({
  myRole,
  type,
  stage,
  cards,
  keyEv,
  canAccuse,
  selectedId,
  selectCardHandler
}) => {

  // const gekv = (obj,val) => Object.keys(obj)[Object.values(obj).indexOf(val)];
  const rolesWithSimpleHand = ['hunter', 'witness', 'accomplice'];
  const hasSimpleHand = rolesWithSimpleHand.includes(myRole) && (type === 'hunterUI');

  if (hasSimpleHand) {
    return (
      <ul className='hand'>
      {cards.map((card) => (
        <Card
          className={card.type}
          key={card.id}
          id={card.id}
          isHighlighted={false}
          isSelected={false}
          isEnabled={false}
          handleClick={null}
        />
      ))}
    </ul>
    );
  };

  console.log(`${cards[0].type} ${selectedId}`);

  const isEnabled = () => {
    switch (type) {
      case `hunterUI`:
        return false;
      case `killerUI`:
        if (stage.id !== `Setup`) return false;
        return true;
      case `otherPlayer`:
        if (myRole === 'ghost') return false;
        if (stage.type !== `round` || !canAccuse) return false;
        return true;
      default:
        return console.log(`Err! placeholder`);
    };
  };

  const isHighlighted = (cardId) => {
    if (myRole === 'hunter' || myRole === 'witness') return false;
    if (keyEv) return keyEv.includes(cardId);
  };

  return (
    <ul className='hand'>
    {cards.map((card) => (
      <Card
        card={card}
        className={card.type}
        key={card.id}
        id={card.id}
        isHighlighted={isHighlighted(card.id)}
        isEnabled={isEnabled(card.id)}
        isSelected={selectedId === card.id}
        handleClick={selectCardHandler}
      />
    ))}
  </ul>
  );
};

export default Cards;
