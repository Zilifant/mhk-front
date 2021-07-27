import React, {
  useContext
} from 'react';
import { SocketContext } from '../../../../context/contexts';
import Container from '../../../shared/Container';
import Button from '../../../ui-elements/Button';

const Setup = ({
  className, readyHandler, iAmLeader, gameSettings
}) => {

  const { socket } = useContext(SocketContext);

  const toggleHandler = (toggledItem) => {
    socket.current.emit('toggle', toggledItem);
  };

  return (
    <Container className={className + 'controls'} parentGrid='main'>
      <Button onClick={readyHandler} disabled={false}>
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
