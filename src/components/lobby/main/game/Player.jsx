import React, {
  // useState,
  useContext,
  // useEffect
} from 'react';
import { useParallelSelector } from '../../../../hooks/parallel-selector';
import { useGame } from '../../../../hooks/game-hook';
import { SocketContext } from '../../../../context/contexts';
import Container from '../../../shared/Container';
import Button from '../../../ui-elements/Button';
import Cards from './Cards';

const Player = ({
  myRole,
  stage,
  hand,
  isRedTeam,
  playerId,
  accusalSpent,
  keyEv,
  canAccuse,
  canBeTargeted,
  rolesRef
}) => {

  const { socket } = useContext(SocketContext);

  const isRoundStage = stage.type === 'round';
  const types = Object.keys(hand);

  const {
    accusationHandler,
    killWitnessHandler
  } = useGame(socket);

  const {
    selTracker,
    minSelected,
    selectHandler,
    submitSelection
  } = useParallelSelector(types);

  const allRoles = () => {
    const role = rolesRef.find(entry => entry.user.id === playerId).role
    return (
      <li className={`role ${role}`}>{role.toUpperCase()}</li>
    );
  };

  return (
    <Container className='player'>
      <div className='player-info'>
        <li>{playerId.slice(0,-5)}</li>
        <li className={accusalSpent ? 'bdg acc-spent' : 'bdg acc-avail'}>[BADGE]</li>
        {(myRole === 'ghost') && allRoles()}
        {(myRole === 'witness') && isRedTeam && <li className='role redteam'>!!!</li>}
        {(myRole === 'killer') && isRedTeam && <li className='role redteam'>ACCOMPLICE</li>}
        {(myRole === 'accomplice') && isRedTeam && <li className='role redteam'>KILLER</li>}
        {myRole !== 'ghost' && isRoundStage && canAccuse &&
        <Button
          className='confirm-accusation'
          onClick={() => submitSelection({cb:[accusationHandler], reset:true})}
          disabled={!minSelected}
        >
          ACCUSE
        </Button>}
        {canBeTargeted && 
        <Button
          className='confirm-accusation'
          onClick={() => killWitnessHandler(playerId)}
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
