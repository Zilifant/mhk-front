import React, {
  // useState
} from 'react';
import Card from './Card';
import '../../../../styles/cards.css';

const Hand = ({
  myRole, type, stage, cards, keyEv, canAccuse, selectCardHandler, amISelected, amIEnabled
}) => {

  if ((myRole === 'Hunter') && (type === `hunterUI`)) {
    return (
      <ul className='hand'>
      {cards.map((card) => (
        <Card
          className='evidence'
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

  const canBeEnabled = (i) => {
    switch (type) {
      case `hunterUI`:
        return false;
      case `killerUI`:
        if (stage !== `Setup`) return false;
        return amIEnabled(i);
      case `otherPlayer`:
        if (myRole === `Ghost`) return false;
        if (stage === `Setup` || !canAccuse) return false;
        return amIEnabled(i);
      default:
        return console.log(`Err! placeholder`)
    };
  };

  const checkHighlight = (cardId) => {
    if (myRole === `Hunter`) return false;
    return keyEv.includes(cardId);
  };

  return (
    <ul className='hand'>
    {cards.map((card, index) => (
      <Card
        className='evidence'
        key={card.id}
        id={card.id}
        isHighlighted={checkHighlight(card.id)}
        isSelected={amISelected(card.id)}
        isEnabled={canBeEnabled(card.id)}
        handleClick={selectCardHandler}
      />
    ))}
  </ul>
  );
};

export default Hand;

  // const enabled = () => {
  //   if (stage === 'Setup' && myRole === 'Killer' && isMine) return true;
  //   if (stage !== 'Setup' && !viewAsGhost && !isMine && canAccuse) return true;
  //   return false;
  // };

  // const checkEnabled = () => {
  //   if (myRole === 'Ghost') return false;
  //   if (myRole === 'Killer') return disabledForKiller;
  //   if (myRole === 'Hunter') return disabledForHunter;
  // };

  // // const disabledForHunter = 

  // const disabledForKiller = (stage !== 'Setup' && !isMine)

  // const checkEnabled = (index) => {
  //   if (enabled()) {
  //     if (!maxReached) {
  //       return true;
  //     } else if (selectedCards[index].isSelected) {
  //       return true
  //     } else {
  //       return false;
  //     };
  //   } else {
  //     return false;
  //   };
  // };

  // if (!isMine || (isMine && myRole !== 'Killer')) {
  //   return (
  //     <ul className='hand'>
  //       {cards.map(card => (
  //         <Card
  //           className='evidence'
  //           dynamic={false}
  //           key={card.id}
  //           id={card.id}
  //           isKeyEvidence={viewAsGhost ? card.isKeyEvidence : false}
  //           // imgURL={card.imgURL}
  //         />
  //       ))}
  //     </ul>
  //   );
  // };

  // if (isMine && myRole === 'Killer' && selectedCards) {
  //   return (
  //     <React.Fragment>
  //       <Button
  //         onClick={() => console.log(selectedCards)}
  //       >
  //         SELECTED
  //       </Button>
  //       <ul className='hand'>
  //         {cards.map((card, index) => (
  //           <Card
  //             className='evidence'
  //             dynamic={true}
  //             key={card.id}
  //             id={card.id}
  //             // imgURL={card.imgURL}
  //             handleClick={selectCardHandler}
  //             isSelected={selectedCards[index].isSelected}
  //             twoSelected={twoSelected}
  //           />
  //         ))}
  //       </ul>
  //     </React.Fragment>
  //   );
  // }
