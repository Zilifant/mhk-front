import React, {
  // useState,
  useContext,
  // useEffect
} from 'react';
import { UserContext } from '../../../context/contexts';
import Container from '../../shared/Container';
import Button from '../../ui-elements/Button';

const Info = ({
  startGameHandler,
  nextRoundHandler,
  canStart,
  gameOn,
  clearGameHandler,
  stage,
  iAmLeader
}) => {

  const { userName, myLobby } = useContext(UserContext);

  return (
    <Container className="info" parentGrid='main'>
      <div>
        Name: {userName}, Lobby: {myLobby}{gameOn && `, Stage: ${stage}`}
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
      {iAmLeader && gameOn && (stage === 'Round 1' || stage === 'Round 2') &&
        <Button onClick={nextRoundHandler}>
          ROUND
        </Button>
      }
    </Container>
  );
};

export default Info;
