import React, {
  // useState
} from 'react';
import Card from './Card';
import '../../../../styles/cards.css';

const Hand = ({
  stage, cards, selectedCards, selectCardHandler, myRole, isMine, viewAsGhost, twoSelected, keyEv, canAccuse
}) => {

  if (myRole === 'Hunter') {
    return (
      <ul className='hand'>
      {cards.map((card) => (
        <Card
          key={card.id}
          className='evidence'
          id={card.id}
          isMine={isMine}
          isHighlighted={false}
          isSelected={false}
          isEnabled={false}
          handleClick={null}
        />
      ))}
    </ul>
    );
  };

  const checkHighlight = (card) => {
    const isKeyEv = keyEv.includes(card.id);
    if ((viewAsGhost || myRole === 'Killer') && isKeyEv) return true;
    return false;
  };

  const enabled = () => {
    if (stage === 'Setup' && myRole === 'Killer' && isMine) return true;
    if (stage !== 'Setup' && !viewAsGhost && !isMine && canAccuse) return true;
    return false;
  };

  const checkEnabled = (index) => {
    if (enabled()) {
      if (!twoSelected) {
        return true;
      } else if (selectedCards[index].isSelected) {
        return true
      } else {
        return false;
      };
    } else {
      return false;
    };
  };

  return (
    <ul className='hand'>
    {cards.map((card, index) => (
      <Card
        key={card.id}
        className='evidence'
        id={card.id}
        isMine={isMine}
        isHighlighted={checkHighlight(card)}
        isSelected={selectedCards[index].isSelected}
        isEnabled={checkEnabled(index)}
        handleClick={selectCardHandler}
      />
    ))}
  </ul>
  );
};

export default Hand;

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
