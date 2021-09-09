import React, {
  useContext
} from 'react';
import { SocketContext } from '../../../../context/contexts';
import { useGame } from '../../../../hooks/game-hook';
import Container from '../../../shared/Container';
import Button from '../../../ui-elements/Button';
import TimerSetup from './TimerSetup';
import Tooltip from '../../../shared/Tooltip';
import '../../../../styles/setup.css';

const Setup = ({
  lobby,
  iAmLeader,
  gameSettings,
}) => {

  const { socket } = useContext(SocketContext);

  const {
    startGameHandler,
    toggleHandler,
    chooseTimerHandler,
  } = useGame(socket);

  const advRoles = [
    {id: 'witness', active: gameSettings.hasWitness},
    {id: 'accomplice', active: gameSettings.hasAccomplice}
  ];

  const advRolesLeader = () => (
    <div className='advrole-wrapper'>
      {advRoles.map((role, i) => (
        <Button
          key={i}
          className={`advrole ${role.active ? 'on' : 'off'}`}
          onClick={() => toggleHandler(role.id)}
          disabled={!lobby.canUseAdvRoles()}
        >
          {role.id}
        </Button>
      ))}
    </div>
  );

  const advRolesBasic = () => (
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

  return (
    <Container className={`setup ${iAmLeader ? 'leader' : 'notleader'}`}>

      {iAmLeader &&
      <div className='startgame ttip-parent'>
        <Button
          className='startgame'
          onClick={startGameHandler}
          disabled={!lobby.canStart()}
        >Start Game</Button>
        <Tooltip tip='waitMorePlayers' side='bottom' />
      </div>}

      <div className='settings'>
        <div className='setup-section'>
          <div className='settings-title'>Advanced Roles</div>
          <div className='settings-content roles ttip-parent'>
            {iAmLeader ? advRolesLeader() : advRolesBasic()}
            <Tooltip tip='advRoles' side='bottom' />
          </div>
        </div>

        <div className='setup-section'>
          <div className='settings-title'>Round Timer</div>
          <div className='settings-content timer ttip-parent'>
            <TimerSetup
              iAmLeader={iAmLeader}
              gameSettings={gameSettings}
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
