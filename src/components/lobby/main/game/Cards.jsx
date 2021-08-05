import React, {
  // useState
} from 'react';
import Card from './Card';
import '../../../../styles/cards.css';

const Cards = ({
  myRole,
  type,
  cardType,
  stage,
  cards,
  keyEv,
  canIAccuse,
  selectedId,
  selectCardHandler
}) => {

  const rolesWithSimpleHand = ['hunter', 'witness', 'accomplice'];
  const hasSimpleHand = rolesWithSimpleHand.includes(myRole) && (type === 'hunterUI');

  if (hasSimpleHand) {
    return (
      <ul className={`c-group ${cardType}`}>
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          className={card.type}
          isHighlighted={false}
          isSelected={false}
          isEnabled={false}
          handleClick={null}
        />
      ))}
    </ul>
    );
  };

  // console.log(`${cards[0].type} ${selectedId}`);

  const isEnabled = () => {
    switch (type) {
      case `hunterUI`:
        return false;
      case `killerUI`:
        if (stage.id !== `Setup`) return false;
        return true;
      case `otherPlayer`:
        if (myRole === 'ghost') return false;
        if (stage.type !== `round` || !canIAccuse) return false;
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
    <ul className={`c-group ${cardType}`}>
    {cards.map((card) => (
      <Card
        key={card.id}
        id={card.id}
        card={card}
        className={card.type}
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
