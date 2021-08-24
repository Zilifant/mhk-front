import React, {
  useContext,
  useState
} from 'react';
import { SocketContext } from '../../../../context/contexts';
import { useGame } from '../../../../hooks/game-hook';
import Container from '../../../shared/Container';
import Button from '../../../ui-elements/Button';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import '../../../../styles/setup.css';

const Setup = ({
  lobby,
  iAmLeader,
  gameSettings,
}) => {

  const { socket } = useContext(SocketContext);

  const [timer, setTimer] = useState({
    minReached: true,
    maxReached: false,
    min: 0,
    max: 5,
    val: 0
  });

  const {
    startGameHandler,
    toggleHandler,
    chooseTimerHandler,
  } = useGame(socket);

  function inc() {
    if (timer.val < timer.max) setTimer({
      ...timer,
      ...{
        val: ++timer.val,
        minReached: false,
      }});

    if (timer.val === timer.max) setTimer({...timer, ...{maxReached: true}});
    const duration = !timer.val ? 'off' : timer.val;
    return chooseTimerHandler(duration);
  };

  function dec() {
    if (timer.val > timer.min) setTimer({...timer, ...{val: --timer.val, maxReached: false}});
    if (timer.val === timer.min) setTimer({...timer, ...{minReached: true}});
    const duration = !timer.val ? 'off' : timer.val;
    return chooseTimerHandler(duration);
  };

  const advRolesLeader = () => (<>
    <div className='advrole-wrapper'>
      <Button
        className={`advrole ${gameSettings.hasWitness ? 'on' : 'off'}`}
        onClick={() => toggleHandler(`witness`)}
        disabled={!lobby.canUseAdvRoles()}
      >
        {gameSettings.hasWitness ? 'Y' : 'X'}
      </Button>
      <div
        className={`advrole ${gameSettings.hasWitness ? 'on' : 'off'}`}
      >WITNESS</div>
    </div>
    <div className='advrole-wrapper'>
      <Button
        className={`advrole ${gameSettings.hasAccomplice ? 'on' : 'off'}`}
        onClick={() => toggleHandler(`accomplice`)}
        disabled={!lobby.canUseAdvRoles()}
      >
        {gameSettings.hasAccomplice ? 'Y' : 'X'}
      </Button>
      <div
        className={`advrole ${gameSettings.hasAccomplice ? 'on' : 'off'}`}
      >ACCOMPLICE</div>
    </div>
  </>);

  const advRolesBasic = () => (<>
    <div
      className={`advrole ${gameSettings.hasWitness ? 'on' : 'off'}`}
    >WITNESS</div>
    <div
      className={`advrole ${gameSettings.hasAccomplice ? 'on' : 'off'}`}
    >ACCOMPLICE</div>
  </>);

  const timerLeader = () => (
    <div className='timer-wrap leader'>
      <div className='timer title'>Round Timer</div>
      <Button
        className='timer dec'
        onClick={dec}
        disabled={timer.minReached}
      ><GoArrowLeft/></Button>
      {timer.val !== 0 && <div className={`timer value on`}>{`${timer.val}:00`}</div>}
      {timer.val === 0 && <div className={`timer value off`}>{'OFF'}</div>}
      <Button
        className='timer inc'
        onClick={inc}
        disabled={timer.maxReached}
      ><GoArrowRight/></Button>
    </div>
  );

  const timerBasic = () => (
    <div className='timer-wrap'>
      <p>Round Timer: {gameSettings.timer.on ? `${timer.val}:00` : 'OFF'}</p>
    </div>
  );

  return (
    <Container className={`setup ${iAmLeader ? 'leader' : 'notleader'}`}>

      {iAmLeader &&
      <div className='setup-section stbtn'>
        <Button
          onClick={startGameHandler}
          disabled={!lobby.canStart()}
        >Start Game</Button>
      </div>}

      <div className='setup-section sttxt txt'>
        <p>{lobby.startGameText(iAmLeader)}</p>
      </div>

      <div className='setup-section ghost txt'>
        <p>{lobby.text.NOTE_CHOOSE_GHOST(iAmLeader)} Ghost: <span className='advrole ghost'>{gameSettings.assignedToGhost?.slice(0,-5) || 'RANDOM'}</span></p>
      </div>

      <div className='setup-section wabtn'>
        {iAmLeader ? advRolesLeader() : advRolesBasic()}
      </div>

      <div className='setup-section watxt txt'>
        <p>{lobby.advRolesRecText()}</p>
        <p>{lobby.advRolesEnText(iAmLeader)}</p>
      </div>

      <div className='setup-section timer'>
        {iAmLeader ? timerLeader() : timerBasic()}
      </div>

    </Container>
  );
};

export default Setup;
