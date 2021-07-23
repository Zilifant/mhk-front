import React, {
  // useState,
  useContext,
  // useEffect
} from 'react';
import { useMultiSelector } from '../../../../hooks/multiselector-hook';
import { SocketContext } from '../../../../context/contexts';
import Container from '../../../shared/Container';
import Button from '../../../ui-elements/Button';
import Hand from './Hand';

const Player = ({
  myRole, stage, hand, role, playerId, accusalSpent, keyEv, canAccuse
}) => {

  const { socket } = useContext(SocketContext);

  const emitAccusation = (accEv, [socket, playerId]) => {
    console.log(socket);
    console.log(playerId);
    const accusation = {
      accuserSID: socket.current.id,
      accusedId: playerId,
      accusalEv: accEv
    };
    socket.current.emit('accusation', accusation)
  };

  const {
    selectItemHandler,
    confirmSelection,
    amISelected, amIEnabled,
    minReached, maxReached,
    selTracker
  } = useMultiSelector({items: hand, min: 2, max: 2});

  if (role === 'Ghost') return null;

  return (
    <Container className='player'>
      <div className='player-info'>
        <li>{playerId.slice(0,-5)} ({role[0]})</li>
        <li className={accusalSpent ? 'acc-spent' : 'acc-avail'}>[BADGE]</li>
        {(myRole !== `Ghost`) && (stage !== 'Setup') && canAccuse &&
        <Button
          className='confirm-accusation'
          onClick={() => confirmSelection({
            cb: [emitAccusation, [socket, playerId]],
            resetTracker: true
          })}
          disabled={!minReached}
        >
          ACCUSE
        </Button>}
      </div>
      <Hand
        myRole={myRole}
        type={`otherPlayer`}
        stage={stage}
        cards={hand}
        amISelected={amISelected}
        amIEnabled={amIEnabled}
        selectedCards={selTracker}
        selectCardHandler={selectItemHandler}
        maxReached={maxReached}
        canAccuse={canAccuse}
        keyEv={keyEv}
      />
    </Container>
  )
};

export default Player;
