import React, {
  useContext
} from 'react';
import { SocketContext } from '../../../../context/contexts';
import { useGame } from '../../../../hooks/game-hook';
import Container from '../../../shared/Container';
import Button from '../../../ui-elements/Button';
import '../../../../styles/setup.css';

const Setup = ({
  className,
  iAmLeader,
  gameSettings,
  canStart,
  startGameText,
}) => {

  const { socket } = useContext(SocketContext);

  const {
    startGameHandler,
    toggleHandler
  } = useGame(socket);

  const leaderUI = () => (<>
    <Button
      onClick={startGameHandler}
      disabled={!canStart}
    >Start Game</Button>
    <div className='advrole-wrapper'>
      <Button
        className={`advrole ${gameSettings.hasWitness ? 'on' : 'off'}`}
        onClick={() => toggleHandler(`witness`)}
        disabled={false}
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
        disabled={false}
      >
        {gameSettings.hasAccomplice ? 'Y' : 'X'}
      </Button>
          <div
        className={`advrole ${gameSettings.hasAccomplice ? 'on' : 'off'}`}
      >ACCOMPLICE</div>
    </div>
  </>);

  const basicUI = () => (<>
    <div
      className={`advrole ${gameSettings.hasWitness ? 'on' : 'off'}`}
    >WITNESS</div>
    <div
      className={`advrole ${gameSettings.hasAccomplice ? 'on' : 'off'}`}
    >ACCOMPLICE</div>
  </>);

  return (
    <Container className={className + 'controls'} parentGrid='main'>
      <div className='start-game-text'>{startGameText}</div>
      {iAmLeader ? leaderUI() : basicUI()}
    </Container>
  );
};

export default Setup;
