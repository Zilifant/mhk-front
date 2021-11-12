import { useContext } from 'react';
import { SocketContext } from '../../../../context/contexts';
import { useGame } from '../../../../hooks/game-hook';
import Container from '../../../shared/Container';
import TimerSetup from './TimerSetup';
import Tooltip from '../../../shared/Tooltip';
import '../../../../styles/setup.scss';

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

  const AdvRolesLeader = () => (
    <div className='advrole-wrapper'>
      {advRoles.map((role, i) => (
        <button
          key={i}
          className={`advrolebtn ${role.active && 'selected'}`}
          onClick={() => toggleHandler(role.id)}
          disabled={!lobby.canUseAdvRoles()}
        >
          {role.id}
        </button>
      ))}
    </div>
  );

  const AdvRolesBasic = () => (
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
            {iAmLeader ? <AdvRolesLeader /> : <AdvRolesBasic />}
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
