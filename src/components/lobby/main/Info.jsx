// Info //
// Shows general lobby and/or game info.
// TO DO: Split into separate components for game and nogame state.
// TO DO: remove redundant checks for stage.

import { useState, useContext } from 'react';
import { UserContext, SocketContext } from '../../../context/contexts';
import { useGame } from '../../../hooks/game-hook';
import textToClipboard from '../../../util/textToClipboard';
import Container from '../../shared/Container';
import Tooltip from '../../shared/Tooltip';
import SVGButton from '../../shared/SVGButton';
import '../../../styles/info.scss';
import '../../../styles/svgs.scss';
import '../../../styles/tooltips.scss';

const Info = ({
  gameOn,
  stage,
  iAmLeader
}) => {

  const { myLobby, userName, isStreamer } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  const {
    clearGameHandler,
    nextRoundHandler,
  } = useGame(socket);

  // Hide/show lobby id and track state.
  const [lobbyIdHidden, setLobbyIdHidden] = useState(isStreamer);
  const hideLobbyIdHandler = () => setLobbyIdHidden(!lobbyIdHidden);

  const isRoundOneOrTwo = stage?.id === 'round-1' || stage?.id === 'round-2';

  const showGameStage = stage && stage.id; // Is stage loaded?
  const showClearBtn = iAmLeader && stage?.id === 'game-over';
  const showRoundBtn = iAmLeader && stage && isRoundOneOrTwo;

  if (!gameOn) return (
    <Container className='info nogame'>

      <div className='lobbyid-wrap'>

        <div className='ttip-parent'>
          <SVGButton
            className='hidelobbyid'
            icon={lobbyIdHidden ? 'show' : 'hide'}
            onClick={hideLobbyIdHandler}
            disabled={false}
          />
          <Tooltip tip='hideShowName' side='left' opts='singleline'/>
        </div>

        <div className={`info-lobbyid ${lobbyIdHidden ? 'obscured' : 'visible'}`}>
          {lobbyIdHidden ? 'lobby name hidden' : myLobby}
        </div>

        <div className='ttip-parent'>
          <SVGButton
            className='copyurl'
            icon='copy'
            onClick={() => textToClipboard(`https://mhk.vercel.app/${myLobby}`)}
            disabled={false}
          />
          <Tooltip tip='copyUrl' side='right' opts='singleline'/>
        </div>

      </div>

    </Container>
  );

  return (
    <Container className='info game'>

      {iAmLeader &&
        <div className='game-control-buttons'>
          {showRoundBtn &&
            <button
              className='game-control nextround'
              onClick={nextRoundHandler}
            >
              NEXT ROUND
            </button>
          }
          {showClearBtn &&
            <button
              className='game-control cleargame'
              onClick={clearGameHandler}
            >
              CLEAR GAME
            </button>
          }
        </div>
      }

      <div className='gamestage-username'>
        {showGameStage &&
          <div className='info gamestage'>
            {stage.display}
          </div>
        }
        <div className='info user-name'>
          {userName}
        </div>
      </div>

    </Container>
  );
};

export default Info;