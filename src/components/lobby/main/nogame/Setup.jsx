import React, {
  useContext
} from 'react';
import { SocketContext } from '../../../../context/contexts';
import { useGame } from '../../../../hooks/game-hook';
import Container from '../../../shared/Container';
import Button from '../../../ui-elements/Button';
import TimerSetup from './TimerSetup';
import '../../../../styles/setup.css';

const Setup = ({
  lobby,
  iAmLeader,
  gameSettings,
}) => {

  const { socket } = useContext(SocketContext);

  const tttext = 'At least 5 players are needed to use the Witness and Accomplice roles (6 or more players are recommended). For the best experience, use both the Witness and the Accomplice, or neither.'

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
        {/* <p>{lobby.startGameText(iAmLeader)}</p> */}
      </div>

      <div className='setup-section ghost txt'>
        <p>{lobby.text.NOTE_CHOOSE_GHOST(iAmLeader)} Ghost: <span className='advrole ghost'>{gameSettings.assignedToGhost?.slice(0,-5) || 'RANDOM'}</span></p>
      </div>

      <div className='setup-section wabtn tooltip'>
        {iAmLeader ? advRolesLeader() : advRolesBasic()}
        <span className='tooltiptext'>{tttext}</span>
      </div>

      <div className='setup-section watxt txt'>
        <p>{lobby.advRolesRecText()}</p>
        <p>{lobby.advRolesEnText(iAmLeader)}</p>
      </div>

      <div className='setup-section timer'>
        <TimerSetup
          iAmLeader={iAmLeader}
          gameSettings={gameSettings}
          chooseTimerHandler={chooseTimerHandler}
        />
      </div>

    </Container>
  );
};

export default Setup;
