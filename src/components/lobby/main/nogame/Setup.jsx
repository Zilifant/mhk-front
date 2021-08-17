import React, {
  useContext
} from 'react';
import { SocketContext } from '../../../../context/contexts';
import { useGame } from '../../../../hooks/game-hook';
import Container from '../../../shared/Container';
import Button from '../../../ui-elements/Button';
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

  const timerLeader = () => (<>
    <section className='section-wrapper'>
      <div className='text'>
        <p>Round Timer (Minutes)</p>
      </div>
      <div className='timer-buttons'>
        {gameSettings.timer.durationOpts.map((opt, i) => (
          <Button
            key={i}
            className={`timer ${opt === gameSettings.timer.duration ? 'selected' : 'unselected'}`}
            onClick={() => chooseTimerHandler(opt)}
            disabled={false}
          >
            {opt}
          </Button>
        ))}
      </div>
    </section>
  </>);

  const timerBasic = () => (<>
    <section className='section-wrapper'>
      <div className='text'>
        <p>Round Timer: {gameSettings.timer.on ? `${gameSettings.timer.duration} Minutes` : 'OFF'}</p>
      </div>
    </section>
  </>);

  return (
    <Container className={'setup'}>

      <section className='section-wrapper'>
        <div className='text'>
          <p>{lobby.startGameText(iAmLeader)}</p>
        </div>
        {iAmLeader && <Button
          onClick={startGameHandler}
          disabled={!lobby.canStart()}
        >Start Game</Button>}
      </section>

      <section className='section-wrapper'>
        <div className='text'>
          <p>{lobby.text.NOTE_CHOOSE_GHOST(iAmLeader)}</p>
        </div>
        <div className='advrole ghost'>
          {gameSettings.assignedToGhost?.slice(0,-5) || 'RANDOM'}
        </div>
      </section>

      <section className='section-wrapper'>
        <div className='text'>
          <p>{lobby.advRolesEnText(iAmLeader)}</p>
        </div>
        <div className='text'>
          <p>{lobby.advRolesRecText()}</p>
        </div>
        {iAmLeader ? advRolesLeader() : advRolesBasic()}
      </section>

      {iAmLeader ? timerLeader() : timerBasic()}

    </Container>
  );
};

export default Setup;
