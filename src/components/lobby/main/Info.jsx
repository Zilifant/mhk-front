import React, {
  useState,
  useContext,
  // useEffect
} from 'react';
import { UserContext, SocketContext } from '../../../context/contexts';
import Container from '../../shared/Container';
import { useGame } from '../../../hooks/game-hook';
import Tooltip from '../../shared/Tooltip';
import SVGButton from '../../ui-elements/SVGButton';
import InfoModal from '../../shared/InfoModal';
import { rules } from '../../../util/utils';
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

  function textToClipboard(text) {
    const dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    alert('Lobby URL copied.');
  }

  const [lobbyIdHidden, setLobbyIdHidden] = useState(isStreamer);

  const hideLobbyIdHandler = () => setLobbyIdHidden(!lobbyIdHidden);

  const lobbyId = myLobby === 'z' ? 'Splendid-Monolith-7659' : myLobby;

  const showGameStage = stage && stage.id;
  const showClearBtn = iAmLeader && stage?.id === 'game-over';
  const showRoundBtn = iAmLeader
                    && stage
                    && (stage.id === 'round-1' || stage.id === 'round-2');

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
          <Tooltip tip='hideShowName' side='left' />
        </div>
        <div className={`info-lobbyid ${lobbyIdHidden ? 'obscured' : 'visible'}`}>
          {lobbyIdHidden ? 'lobby name hidden' : lobbyId}
        </div>
        <div className='ttip-parent'>
          <SVGButton
            className='copyurl'
            icon='copy'
            onClick={() => textToClipboard(`https://mhk-front.herokuapp.com/${lobbyId}`)}
            disabled={false}
          />
          <Tooltip tip='copyUrl' side='right' />
        </div>
      </div>
    </Container>
  );

  return (
    <Container className='info game'>
      <div className='gamestage-username'>
        <InfoModal
          className='rules footer'
          buttonContent='rulebook'
          info={rules}
        />
        {showGameStage &&
        <div className='info gamestage'>
          {'///'} {stage.display}
        </div>}
        <div className='info user-name'>
          {userName}
        </div>
      </div>
      {iAmLeader && <div className='game-control-buttons'>
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
      </div>}
    </Container>
  );
};

export default Info;