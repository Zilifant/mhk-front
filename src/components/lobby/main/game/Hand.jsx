import React, {
  // useState
} from 'react';
import Card from './Card';
import '../../../../styles/cards.css';

const Hand = ({
  myRole,
  type,
  stage,
  cards,
  keyEv,
  canAccuse,
  selectCardHandler,
  amISelected,
  amIEnabled,
  isRoundStage
}) => {

  const rolesWithSimpleHand = ['hunter', 'witness', 'accomplice'];

  if (!isRoundStage || (rolesWithSimpleHand.includes(myRole) && type === 'hunterUI')) {
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
        if (myRole === 'ghost') return false;
        if (stage === `Setup` || !canAccuse) return false;
        return amIEnabled(i);
      default:
        return console.log(`Err! placeholder`);
    };
  };

  const checkHighlight = (cardId) => {
    if (myRole === 'hunter' || myRole === 'witness') return false;
    if (keyEv) return keyEv.includes(cardId);
  };

  return (
    <ul className='hand'>
    {cards.map((card) => (
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
  //   if (stage === 'Setup' && myRole === 'killer' && isMine) return true;
  //   if (stage !== 'Setup' && !viewAsGhost && !isMine && canAccuse) return true;
  //   return false;
  // };

  // const checkEnabled = () => {
  //   if (myRole === 'ghost') return false;
  //   if (myRole === 'killer') return disabledForKiller;
  //   if (myRole === 'hunter') return disabledForHunter;
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

  // if (!isMine || (isMine && myRole !== 'killer')) {
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

  // if (isMine && myRole === 'killer' && selectedCards) {
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
