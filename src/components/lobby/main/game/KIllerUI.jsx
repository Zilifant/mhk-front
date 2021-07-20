import React, {
  // useState,
  // useCallback,
  // useContext,
  // useEffect
} from 'react';
import { useCardSelector } from '../../../../hooks/select-hook';
import Container from '../../../shared/Container';
import Button from '../../../ui-elements/Button';
import Hand from './Hand';

const KillerUI = ({
  thisPlayer: { hand, role, userName, accusalSpent }, stage, keyEv
}) => {
  // console.log('KillerUI');

  const {
    selectCard,
    confirmKeyEvSelection,
    twoSelected,
    selectedCards
  } = useCardSelector(hand);

  return (
    <Container className='self self-killer' parentGrid='main'>
      <div className='player-info'>
        <li>{userName} ({role[0]})</li>
        <li className={accusalSpent ? 'acc-spent' : 'acc-avail'}>[BADGE]</li>
        {(stage === 'Setup') && <Button
          className='confirm-key-evidence'
          onClick={() => confirmKeyEvSelection(selectedCards)}
          disabled={!twoSelected}
        >
          Confirm
        </Button>}
      </div>
      <Hand
        stage={stage}
        cards={hand}
        selectedCards={selectedCards}
        selectCardHandler={selectCard}
        myRole={role}
        isMine={true}
        twoSelected={twoSelected}
        keyEv={keyEv}
      />
    </Container>
  );
};

export default KillerUI;

  // useEffect(() => {
  //   console.log('keyEvSub');
  //   socket.current.on('keyEvidenceChosen', () => {
  //     console.log('clearSelected');
  //     setSelectedCards(initSelection(hand))
  //   });
  // }, [socket, initSelection, hand]);