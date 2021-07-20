import React, {
  // useState,
  useContext,
  // useEffect
} from 'react';
import { UserContext } from '../../../context/contexts';
import { useTextParser } from '../../../hooks/text-parser-hook';
import Container from '../../shared/Container';
import Button from '../../ui-elements/Button';

const Info = ({
  startGameHandler, nextRoundHandler, canStart, gameOn, clearGameHandler, stage, prevGameResult
}) => {

  const { userName, myLobby } = useContext(UserContext);
  const { parseGameResult } = useTextParser();

  return (
    <Container className="info" parentGrid='main'>
      <div>
        Name: {userName}, Lobby: {myLobby}{gameOn && `, Stage: ${stage}`}
      </div>
      {!gameOn &&
        <Button onClick={startGameHandler} disabled={!canStart}>
          START
        </Button>
      }
      {gameOn &&
        <Button onClick={clearGameHandler}>
          CLEAR
        </Button>
      }
      {gameOn && (stage === 'Round 1' || stage === 'Round 2') &&
        <Button onClick={nextRoundHandler}>
          ROUND
        </Button>
      }
      {!gameOn && prevGameResult &&
        <div className='gameresult'>{parseGameResult(prevGameResult)}</div>
      }
    </Container>
  );
};

export default Info;
