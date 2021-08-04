import React, {
  useContext
} from 'react';
import { UserContext, SocketContext } from '../../../../context/contexts';
import { useGame } from '../../../../hooks/game-hook';
import Container from '../../../shared/Container';
import Button from '../../../ui-elements/Button';

const Setup = ({
  className,
  iAmLeader,
  gameSettings,
}) => {

  const { userId } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  const {
    readyHandler,
    toggleHandler
  } = useGame(socket);

  return (
    <Container className={className + 'controls'} parentGrid='main'>
      <Button onClick={() => readyHandler(userId)} disabled={false}>
        READY
      </Button>
      <div
        className={gameSettings.hasWitness ? 'advrole-on' : 'advrole-off'}
      >
        Witness
      </div>
      <div
        className={gameSettings.hasAccomplice ? 'advrole-on' : 'advrole-off'}
      >
        Accomplice
      </div>
      {iAmLeader && <div>
        <Button onClick={() => toggleHandler(`witness`)} disabled={false}>
          Witness
        </Button>
        <Button onClick={() => toggleHandler(`accomplice`)} disabled={false}>
          Accomplice
        </Button>
      </div>}
    </Container>
  );
};

export default Setup;
