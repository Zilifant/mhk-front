import React, {
  // useState,
  useContext,
  // useEffect
} from 'react';
import { useParallelSelector } from '../../../../hooks/parallel-selector';
import { useGame } from '../../../../hooks/game-hook';
import { SocketContext } from '../../../../context/contexts';
import { badge } from '../../../../util/utils';
import Container from '../../../shared/Container';
import Button from '../../../ui-elements/Button';
import Cards from './Cards';
import '../../../../styles/player.scss';

const Player = ({
  myRole,
  stage,
  isRedTeam,
  keyEv,
  canIAccuse,
  canBeTargeted,
  rolesRef,
  player: {
    id: playerId,
    canAccuse: canTheyAccuse,
    isOnline,
    hand,
  }
}) => {

  const { socket } = useContext(SocketContext);

  const isRoundStage = stage.type === 'round';
  const types = Object.keys(hand);
  const connectionStatus = isOnline ? 'online' : 'offline';

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
    const role = rolesRef.find(entry => entry.user.id === playerId).role;
    return [role, role];
  };

  const accuseBtn = () => {
    return (
      <Button
        className='confirm-accusation three-d'
        onClick={() => submitSelection({cb:[accusationHandler, playerId], reset:true})}
        disabled={!minSelected}
      >
        ACCUSE
      </Button>
    );
  };

  const killBtn = () => {
    return (
      <Button
        className='confirm-kill three-d'
        onClick={() => killWitnessHandler(playerId)}
        disabled={false}
      >
        KILL
      </Button>
    );
  };

  const canIInteract = myRole !== 'ghost';

  const interact = () => {
    if (canIInteract && isRoundStage && canIAccuse) return accuseBtn();
    if (canBeTargeted) return killBtn();
    return null;
  };

  const showRedTeam = (myRole) => {
    if (myRole === 'witness') return ['redteam', '!!!'];
    if (myRole === 'killer') return ['accomplice', 'accomplice'];
    if (myRole === 'accomplice') return ['killer', 'killer'];
    return null;
  };

  const role = () => {
    if (myRole === 'ghost' || myRole === 'spectator') return allRoles();
    if (myRole === 'hunter') return ['mystery', '???'];
    if (isRedTeam) return showRedTeam(myRole);
    return ['hunter', 'hunter'];
  }

  const [roleClass, roleDisplay] = role();

  // for case where player had selected cards of a player
  // other than the one they accused; if player has already
  // used their accusation, show all cards as unselected by
  // ignoring contents of selTracker
  const getSelectedId = (type) => canIAccuse ? selTracker[type]?.id : null;

  return (
    <Container className={`player ${!canIInteract && 'never-interacts'}`}>
      <li className={`p-info badge ${badge(canTheyAccuse)}`}>
        *** o7 ***
      </li>
      <li className={`p-info role ${roleClass}`}>
        <div className='wrapper'>
          <div>
            {/* <span className={`indicator ${connectionStatus}`}></span> */}
            <span className={`username ${connectionStatus}`}>{playerId.slice(0,-5)}</span>
          </div>
          <div className='subtitle'>Their role</div>
          <div className={roleClass}>{roleDisplay.toUpperCase()}</div>
        </div>
      </li>
      {canIInteract && <li className={`p-info interact`}>
        {interact()}
      </li>}
      {types.map((type) => (
        <Cards
          myRole={myRole}
          type={`otherPlayer`}
          cardType={type}
          key={type}
          stage={stage}
          cards={hand[type]}
          selectedId={getSelectedId(type)}
          selectCardHandler={selectHandler}
          canIAccuse={canIAccuse}
          isRoundStage={isRoundStage}
          keyEv={keyEv}
        />
      ))}
    </Container>
  )
};

export default Player;