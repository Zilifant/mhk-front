// Setup //
// Wraps components for setting and viewing game settings.

import { useContext } from 'react';
import { SocketContext } from '../../../../context/contexts';
import { useGame } from '../../../../hooks/game-hook';
import Container from '../../../shared/Container';
import TimerSetup from './TimerSetup';
import Tooltip from '../../../shared/Tooltip';
import '../../../../styles/setup.scss';

// Only used internally.
const AdvRoles = ({
  iAmLeader,
  toggleHandler,
  advRolesDisabled,
  hasWitness,
  hasAccomplice,
}) => {

  // Not tracked with useState, since this component completely re-renders
  // each time new data is received from socket.io server.
  const advRoles = [
    {id: 'witness', active: hasWitness},
    {id: 'accomplice', active: hasAccomplice}
  ];

  if (iAmLeader) return (
    <div className='advrole-wrapper'>
      {advRoles.map((role, i) => (
        <button
          key={i}
          className={`advrolebtn ${role.active ? 'on' : 'off'}`}
          onClick={() => toggleHandler(role.id)}
          disabled={advRolesDisabled}
        >
          {role.id}
        </button>
      ))}
    </div>
  );

  return (
    <div className='advrole-wrapper'>
      {advRoles.map((role, i) => (
        <div
          key={i}
          className={`advrole ${role.active ? 'on' : 'off'}`}
        >
          {role.id}
        </div>
      ))}
    </div>
  );

};

const Setup = ({
  lobby,
  iAmLeader,
  gameSettings,
}) => {

  const { socket } = useContext(SocketContext);

  const {
    startGameHandler,
    toggleHandler,
    chooseTimerHandler
  } = useGame(socket);

  return (
    <Container className={`setup ${iAmLeader ? 'leader' : 'notleader'}`}>

      {iAmLeader &&
      <div className='startgame ttip-parent'>
        <button
          className='startgame'
          onClick={startGameHandler}
          disabled={!lobby.canStart()}
        >Start Game</button>
        <Tooltip tip='waitMorePlayers' side='bottom' />
      </div>}

      <div className='settings'>
        <div className='setup-section'>
          <div className='settings-title'>Advanced Roles</div>
          <div className='settings-content roles ttip-parent'>
            <AdvRoles
              iAmLeader={iAmLeader}
              toggleHandler={toggleHandler}
              advRolesDisabled={!lobby.canUseAdvRoles()}
              hasWitness={gameSettings.hasWitness}
              hasAccomplice={gameSettings.hasAccomplice}
            />
            <Tooltip tip='advRoles' side='bottom' />
          </div>
        </div>

        <div className='setup-section'>
          <div className='settings-title'>Round Timer</div>
          <div className='settings-content timer ttip-parent'>
            <TimerSetup
              iAmLeader={iAmLeader}
              settings={gameSettings.timer}
              chooseTimerHandler={chooseTimerHandler}
            />
            <Tooltip tip='timerSetup' side='bottom' />
          </div>
        </div>
      </div>

    </Container>
  );
};

export default Setup;
