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
      <div className='setup-section start tooltip right'>
        <Button
          onClick={startGameHandler}
          disabled={!lobby.canStart()}
        >Start Game</Button>
        <Tooltip tip='waitMorePlayers' />
      </div>}

      <div className='setup-section roles tooltip left'>
        {iAmLeader ? advRolesLeader() : advRolesBasic()}
        <Tooltip tip='advRoles' />
      </div>

      <div className='setup-section timer tooltip left'>
        <TimerSetup
          iAmLeader={iAmLeader}
          gameSettings={gameSettings}
          chooseTimerHandler={chooseTimerHandler}
        />
        <Tooltip tip='timerSetup' />
      </div>

    </Container>
  );
};

export default Setup;
