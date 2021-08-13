import React, {
  // useState,
  useContext,
  // useEffect
} from 'react';
import { UserContext, SocketContext } from '../../../context/contexts';
import Container from '../../shared/Container';
import Button from '../../ui-elements/Button';
import { useGame } from '../../../hooks/game-hook';
import '../../../styles/info.css';

const Info = ({
  gameOn,
  stage,
  iAmLeader
}) => {

  const { myLobby } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  const {
    clearGameHandler,
    nextRoundHandler,
  } = useGame(socket);

  function textToClipboard(text) {
    const dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    alert('Lobby URL copied.');
}

  const lobbyId = myLobby === 'z' ? 'splendid-monolith-3289' : myLobby;

  const url = () => {
    if (process.env.REACT_APP_FRONTEND_URL) {
      return `${(process.env.REACT_APP_FRONTEND_URL).slice(8)}/lobby/${lobbyId}`;
    }
    return `www.mhkgame.com/lobby/${lobbyId}`;
  };

  const showGameStage = stage && stage.id;
  const showClearBtn = iAmLeader;
  const showRoundBtn = iAmLeader
                    && stage
                    && (stage.id === 'Round 1' || stage.id === 'Round 2');

  if (!gameOn) return (
    <Container className="info nogame">
      <div className='info-lobbyid'>
        {lobbyId}
      </div>
      <button
        className='info-lobbyurl'
        onClick={() => textToClipboard(url())}
      >
        {url()}
      </button>
    </Container>
  );

  return (
    <Container className="info game">
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
