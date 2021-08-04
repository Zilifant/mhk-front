import React, {
  // useState,
  useContext,
  // useEffect
} from 'react';
import { UserContext, SocketContext } from '../../../context/contexts';
import Container from '../../shared/Container';
import Button from '../../ui-elements/Button';
import { useHttpClient } from '../../../hooks/http-hook';
import { useGame } from '../../../hooks/game-hook';

const Info = ({
  lobby,
  canStart,
  gameOn,
  stage,
  iAmLeader
}) => {

  const { sendRequest } = useHttpClient();
  const getDataHandler = async event => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/admin/data`
      );
      console.log(responseData);
    } catch (err) { console.log(`GetDataHandler Error: ${err}`); };
  };

  const { userName, myLobby } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  const {
    startGameHandler,
    clearGameHandler,
    nextRoundHandler,
  } = useGame(socket);

  return (
    <Container className="info" parentGrid='main'>
      <Button onClick={getDataHandler}>
        SERVER
      </Button>
      <Button onClick={() => console.log(lobby)}>
        CLIENT
      </Button>
      <div>
        Name: {userName}, Lobby: {myLobby}{gameOn && stage && stage.id && `, Stage: ${stage.id}`}
      </div>
      {iAmLeader && !gameOn &&
        <Button onClick={startGameHandler} disabled={!canStart}>
          START
        </Button>
      }
      {iAmLeader && gameOn &&
        <Button onClick={clearGameHandler}>
          CLEAR
        </Button>
      }
      {iAmLeader && gameOn && stage && (stage.id === 'Round 1' || stage.id === 'Round 2') &&
        <Button onClick={nextRoundHandler}>
          ROUND
        </Button>
      }
    </Container>
  );
};

export default Info;
