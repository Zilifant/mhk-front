import React, {
  // useState,
  // useCallback,
  useContext,
  // useEffect
} from 'react';
import { useMultiSelector } from '../../../../hooks/multiselector-hook';
import { SocketContext } from '../../../../context/contexts';
import Container from '../../../shared/Container';
import Button from '../../../ui-elements/Button';
import Hand from './Hand';

const KillerUI = ({
  thisPlayer: {
    hand,
    role,
    userName,
    accusalSpent
  },
  stage,
  keyEv
}) => {

  const { socket } = useContext(SocketContext);

  const emitKeyEvChoice = (keyEv, socket) => socket.current.emit('keyEvidenceChosen', keyEv);

  const {
    selectItemHandler,
    confirmSelection,
    amISelected, amIEnabled,
    minReached, maxReached,
    selTracker
  } = useMultiSelector({items: hand, min: 2, max: 2});

  return (
    <Container className='self self-killer' parentGrid='main'>
      <div className='player-info'>
        <li>{userName} ({role[0]})</li>
        <li className={accusalSpent ? 'acc-spent' : 'acc-avail'}>[BADGE]</li>
        {(stage.id === 'Setup') && <Button
          className='confirm-key-evidence'
          onClick={() => confirmSelection({ cb:[emitKeyEvChoice, socket], resetTracker: true })}
          disabled={!minReached}
        >
          Confirm
        </Button>}
      </div>
      <Hand
        myRole={role}
        type={`killerUI`}
        stage={stage}
        cards={hand}
        selectedCards={selTracker}
        amISelected={amISelected}
        amIEnabled={amIEnabled}
        selectCardHandler={selectItemHandler}
        isMine={true}
        maxReached={maxReached}
        keyEv={keyEv}
      />
    </Container>
  );
};

export default KillerUI;