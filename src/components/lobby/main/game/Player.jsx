// Player //

import difference from 'lodash.difference';
import { useContext } from 'react';
import { useParallelSelector } from '../../../../hooks/parallel-selector-hook';
import { useGame } from '../../../../hooks/game-hook';
import { SocketContext } from '../../../../context/contexts';
import { badge } from '../../../../util/utils';
import Container from '../../../shared/Container';
import Cards from './Cards';
import SVGIcon from '../../../ui-elements/SVGIcon';
import '../../../../styles/player.scss';

const Player = ({
  stage,
  isRedTeam,
  isMurderable,
  keyEv,
  rolesRef,
  thisPlayer: {
    id: myId,
    role: myRole,
    canAccuse: canIAccuse,
  },
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

  function allRoles() {
    const role = rolesRef.find(entry => entry.user.id === playerId).role;
    return [role, role];
  };

  // Accuse a player of being the killer.
  const accuseBtn = () => {
    return (
      <button
        className='confirm-btn accusation'
        onClick={() => submitSelection({
          cb: [accusationHandler, myId, playerId],
          reset: true
        })}
        disabled={!minSelected || isAccompliceThrowing()}
      >
        {!isAccompliceThrowing() ? 'accuse' : 'madness!'}
      </button>
    );
  };

  // Kill a player. Used by killer to attempt to kill the witness during
  // 'second-murder' stage.
  const killBtn = () => {
    return (
      <button
        className='confirm-btn kill'
        onClick={() => killWitnessHandler(playerId)}
        disabled={false}
      >
        kill
      </button>
    );
  };

  const canIInteract = myRole !== 'ghost';

  function interact() {
    if (canIInteract && isRoundStage && canIAccuse) return accuseBtn();
    if (isMurderable) return killBtn();
    return null;
  };

  function showRedTeam(myRole) {
    if (myRole === 'witness') return ['redteam', '!!!'];
    if (myRole === 'killer') return ['accomplice', 'accomplice'];
    if (myRole === 'accomplice') return ['killer', 'killer'];
    return null;
  };

  // Returns an array. First element: css class. Second element: display text.
  function role() {
    if (myRole === 'ghost' || myRole === 'spectator') return allRoles();
    if (myRole === 'hunter') return ['mystery', '???'];
    if (isRedTeam) return showRedTeam(myRole);
    return ['hunter', 'hunter'];
  }

  const [roleClass, roleDisplay] = role(); // Destructure the array.

  // For case where player had selected cards of a player other than the one
  // they accuse. If player has already used their accusation, show all cards
  // as unselected by ignoring contents of selTracker.
  const getSelectedId = (type) => canIAccuse ? selTracker[type]?.id : null;

  // Prevent accomplice from accusing killer with correct evidence.
  const isAccompliceThrowing = () => {
    if (myRole !== 'accomplice') return false;
    if (!isRedTeam) return false;
    const selIds = [selTracker.means?.id, selTracker.evidence?.id];
    if (difference(keyEv, selIds).length === 0) return true;
    return false;
  };

  return (
    <Container className={`player ${!canIInteract && 'no-interact'}`}>
      <li className={`p-info ${roleClass}`}>
        <div className='wrapper'>
          <div>
            <span className={`username ${connectionStatus}`}>
              {playerId.slice(0,-5)}
            </span>
          </div>
          <SVGIcon
            icon='badge'
            className={`badge ${badge(canTheyAccuse)}`}
          />
          <div className='subtitle'>
            Their role
          </div>
          <div className={`role ${roleClass}`}>
            {roleDisplay.toUpperCase()}
          </div>
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