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
}) => {

  const { socket } = useContext(SocketContext);

  const {
    startGameHandler,
    toggleHandler
  } = useGame(socket);

  const leaderUI = () => (<>
    <Button
      className={`advrole ${gameSettings.hasWitness ? 'on' : 'off'}`}
      onClick={() => toggleHandler(`witness`)}
      disabled={false}
    >Witness</Button>
    <Button
      className={`advrole ${gameSettings.hasAccomplice ? 'on' : 'off'}`}
      onClick={() => toggleHandler(`accomplice`)}
      disabled={false}
    >Accomplice</Button>
    <Button
      onClick={startGameHandler}
      disabled={!canStart}
    >Start</Button>
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
      {iAmLeader ? leaderUI() : basicUI()}
    </Container>
  );
};

export default Setup;
