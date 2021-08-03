import React, {
  // useState,
  useContext,
  // useEffect
} from 'react';
import { useParallelSelector } from '../../../../hooks/parallel-selector';
import { SocketContext, UserContext } from '../../../../context/contexts';
import Container from '../../../shared/Container';
import Button from '../../../ui-elements/Button';
import Cards from './Cards';

const Player = ({
  myRole,
  stage,
  hand,
  isGhost,
  isRedTeam,
  playerId,
  accusalSpent,
  keyEv,
  canAccuse,
  canBeTargeted
}) => {

  const isRoundStage = stage.type === 'round';

  const types = Object.keys(hand);

  const { socket } = useContext(SocketContext);
  const { userId } = useContext(UserContext);
  const confirmTarget = (socket, targetId) => socket.current.emit('secondMurder', targetId);
  const emitAccusation = (accEv, socket, playerId) => {
    const accusation = {
      accuserSID: socket.current.id,
      accuserId: userId,
      accusedId: playerId,
      accusalEv: accEv
    };
    socket.current.emit('accusation', accusation);
  };

  const {
    selTracker,
    minSelected,
    selectHandler,
    submitSelection
  } = useParallelSelector(types);

  if (isGhost) return null;

  return (
    <Container className='player'>
      <div className='player-info'>
        <li>{playerId.slice(0,-5)}</li>
        <li className={accusalSpent ? 'bdg acc-spent' : 'bdg acc-avail'}>[BADGE]</li>
        {(myRole === 'witness') && isRedTeam && <li className='red'>!!!</li>}
        {(myRole === 'killer') && isRedTeam && <li className='red'>Accomplice</li>}
        {(myRole === 'accomplice') && isRedTeam && <li className='red'>Killer</li>}
        {myRole !== 'ghost' && isRoundStage && canAccuse &&
        <Button
          className='confirm-accusation'
          onClick={() => submitSelection({cb:[emitAccusation, socket, playerId], reset:true})}
          disabled={!minSelected}
        >
          ACCUSE
        </Button>}
        {canBeTargeted && 
        <Button
          className='confirm-accusation'
          onClick={() => confirmTarget(socket, playerId)}
          disabled={false}
        >
          KILL
        </Button>}
      </div>
      {types.map((type) => (
        <Cards
        myRole={myRole}
        type={`otherPlayer`}
        cardType={type}
        key={type}
        stage={stage}
        cards={hand[type]}
        selectedId={selTracker[type]?.id}
        selectCardHandler={selectHandler}
        canAccuse={canAccuse}
        isRoundStage={isRoundStage}
        keyEv={keyEv}
        />
      ))}
    </Container>
  )
};

export default Player;
