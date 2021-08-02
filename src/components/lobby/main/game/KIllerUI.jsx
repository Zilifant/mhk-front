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
import Cards from './Cards';

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

  const ev = hand.evidence
  const me = hand.means
  let evme = null
  if (ev && me) evme = ev.concat(me);

  const {
    selectItemHandler,
    confirmSelection,
    amISelected, amIEnabled,
    minReached, maxReached,
    selTracker
  } = useMultiSelector({items: evme, min: 2, max: 2});

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
      <Cards
        myRole={role}
        type={`killerUI`}
        cardType='evidence'
        stage={stage}
        cards={hand.evidence}
        selectedCards={selTracker}
        amISelected={amISelected}
        amIEnabled={amIEnabled}
        selectCardHandler={selectItemHandler}
        isMine={true}
        maxReached={maxReached}
        keyEv={keyEv}
      />
      <Cards
        myRole={role}
        type={`killerUI`}
        cardType='means'
        stage={stage}
        cards={hand.means}
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