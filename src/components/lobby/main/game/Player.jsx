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
import '../../../../styles/player.css';

const Player = ({
  myRole,
  stage,
  hand,
  isRedTeam,
  playerId,
  canTheyAccuse,
  keyEv,
  canIAccuse,
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
      <li className={`p-info role ${role}`}>{role.toUpperCase()}</li>
    );
  };

  const badge = canTheyAccuse ? 'bdg acc-avail' : 'bdg acc-spent';

  const accuseBtn = () => {
    return (
      <Button
        className='confirm-accusation'
        onClick={() => submitSelection({cb:[accusationHandler], reset:true})}
        disabled={!minSelected}
      >
        ACCUSE
      </Button>
    );
  };

  const killBtn = () => {
    return (
      <Button
        className='confirm-accusation'
        onClick={() => killWitnessHandler(playerId)}
        disabled={false}
      >
        KILL
      </Button>
    );
  };

  const placeholder = () => {
    return (
      <div className='placeholder'></div>
    );
  };

  const interact = () => {
    if (myRole !== 'ghost' && isRoundStage && canIAccuse) return accuseBtn();
    if (canBeTargeted) return killBtn();
    return null;
  };

  const role = () => {
    if (myRole === 'ghost') return allRoles();
    if (myRole === 'hunter') return <li className='p-info role mystery'>???</li>
    if (isRedTeam) return showRedTeam(myRole);
    return null;
  };

  const showRedTeam = (myRole) => {
    if (myRole === 'witness') return <li className='p-info role redteam'>!!!</li>
    if (myRole === 'killer') return <li className='p-info role redteam'>ACCOMPLICE</li>
    if (myRole === 'accomplice') return <li className='p-info role redteam'>KILLER</li>
    return null;
  };

  return (
    <Container className='player'>
      <li className={`p-info username`}>
        {playerId.slice(0,-5)}
      </li>
      <li className={`p-info badge ${badge}`}>
        ***BADGE***
      </li>
      {role()}
      <li className={`p-info interact`}>
        {interact()}
      </li>
      {/* <div className='player-info'>
        <li>{playerId.slice(0,-5)}</li>
        <li className={canTheyAccuse ? 'bdg acc-avail' : 'bdg acc-spent'}>[BADGE]</li>
        {(myRole === 'ghost') && allRoles()}
        {(myRole === 'witness') && isRedTeam && <li className='role redteam'>!!!</li>}
        {(myRole === 'killer') && isRedTeam && <li className='role redteam'>ACCOMPLICE</li>}
        {(myRole === 'accomplice') && isRedTeam && <li className='role redteam'>KILLER</li>}
        {myRole !== 'ghost' && isRoundStage && canIAccuse &&
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
      </div> */}
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
          canIAccuse={canIAccuse}
          isRoundStage={isRoundStage}
          keyEv={keyEv}
        />
      ))}
    </Container>
  )
};

export default Player;
