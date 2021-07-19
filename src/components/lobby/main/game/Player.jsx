import React, {
  // useState,
  // useContext,
  // useEffect
} from 'react';
import { useCardSelector } from '../../../../hooks/select-hook';
import Container from '../../../shared/Container';
import Button from '../../../ui-elements/Button';
import Hand from './Hand';

const Player = ({
  stage, hand, role, playerId, accusalSpent, viewAsGhost, keyEv, canAccuse
}) => {
  // console.log('Player');

  const {
    selectCard,
    confirmAccusation,
    twoSelected,
    selectedCards
  } = useCardSelector(hand);

  if (role === 'Ghost') return null;

  return (
    <Container className='player'>
      <div className='player-info'>
        <li>{playerId.slice(0,-5)} ({role[0]})</li>
        <li className={accusalSpent ? 'acc-spent' : 'acc-avail'}>[BADGE]</li>
        {!viewAsGhost && (stage === 2) && canAccuse && <Button
          className='confirm-accusation'
          onClick={() => confirmAccusation(playerId, selectedCards)}
          disabled={!twoSelected}
        >
          ACCUSE
        </Button>}
      </div>
      <Hand
        stage={stage}
        cards={hand}
        selectedCards={selectedCards}
        selectCardHandler={selectCard}
        viewAsGhost={viewAsGhost}
        isMine={false}
        twoSelected={twoSelected}
        canAccuse={canAccuse}
        keyEv={keyEv}
      />
    </Container>
  )
};

export default Player;
