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

  const showGameStage = gameOn && stage && stage.id;
  const showStartBtn = iAmLeader && !gameOn;
  const showClearBtn = iAmLeader && gameOn;
  const showRoundBtn = iAmLeader
                    && gameOn
                    && stage
                    && (stage.id === 'Round 1' || stage.id === 'Round 2');

  return (
    <Container className="info" parentGrid='main'>
      <Button onClick={getDataHandler}>
        SERVER
      </Button>
      <Button onClick={() => console.log(lobby)}>
        CLIENT
      </Button>
      <div>User: {userName}</div>
      <div>Lobby: {myLobby === 'z' ? 'Splendid-Monolith-3289' : myLobby}</div>
      {showGameStage &&
        <div>
          Game: {stage.id}
        </div>}
      {showStartBtn &&
        <Button onClick={startGameHandler} disabled={!canStart}>
          START
        </Button>
      }
      {showClearBtn &&
        <Button onClick={clearGameHandler}>
          CLEAR
        </Button>
      }
      {showRoundBtn &&
        <Button onClick={nextRoundHandler}>
          ROUND
        </Button>
      }
    </Container>
  );
};

export default Info;
