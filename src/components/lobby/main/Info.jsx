import React, {
  // useState,
  useContext,
  // useEffect
} from 'react';
import { UserContext, SocketContext } from '../../../context/contexts';
import Container from '../../shared/Container';
import Button from '../../ui-elements/Button';
import { useGame } from '../../../hooks/game-hook';

const Info = ({
  gameOn,
  stage,
  iAmLeader
}) => {

  const { userName, myLobby } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  const {
    clearGameHandler,
    nextRoundHandler,
  } = useGame(socket);

  const showGameStage = gameOn && stage && stage.id;
  const showClearBtn = iAmLeader && gameOn;
  const showRoundBtn = iAmLeader
                    && gameOn
                    && stage
                    && (stage.id === 'Round 1' || stage.id === 'Round 2');

  return (
    <Container className="info">
      <div>User: {userName}</div>
      <div>Lobby: {myLobby === 'z' ? 'splendid-monolith-3289' : myLobby}</div>
      {showGameStage &&
        <div>
          Game: {stage.id}
        </div>}
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
