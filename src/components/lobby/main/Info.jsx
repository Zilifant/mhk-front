import React, {
  useState,
  useContext,
  // useEffect
} from 'react';
import { UserContext, SocketContext } from '../../../context/contexts';
import Container from '../../shared/Container';
import Button from '../../ui-elements/Button';
import { useGame } from '../../../hooks/game-hook';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import Tooltip from '../../shared/Tooltip';
import SVGButton from '../../ui-elements/SVGButton';
import '../../../styles/info.css';
import '../../../styles/buttons.css';

const Info = ({
  gameOn,
  stage,
  iAmLeader
}) => {

  const { myLobby, userName } = useContext(UserContext);
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

  const [lobbyIdHidden, setLobbyIdHidden] = useState(true);

  const hideLobbyIdHandler = () => setLobbyIdHidden(!lobbyIdHidden);

  const lobbyId = myLobby === 'z' ? 'Splendid-Monolith-7659' : myLobby;

  const showGameStage = stage && stage.id;
  const showClearBtn = iAmLeader;
  const showRoundBtn = iAmLeader
                    && stage
                    && (stage.id === 'round-1' || stage.id === 'round-2');

  if (!gameOn) return (
    <Container className='info nogame'>
      <div className='lobbyid-wrap'>
        <div className='tooltip single right'>
          <Button
            className='hidelobbyid'
            onClick={hideLobbyIdHandler}
          >
            {lobbyIdHidden ? <GoEye/> : <GoEyeClosed/>}
          </Button>
          <Tooltip tip='hideShowName' />
        </div>
        <div className={`info-lobbyid ${lobbyIdHidden ? 'obscured' : 'visible'}`}>
          {lobbyIdHidden ? 'lobby name hidden' : <div className='debug'>lobbyId</div>}
        </div>
        <div className='tooltip single left'>
          <SVGButton
            className='copyurl'
            icon='copy'
            onClick={() => textToClipboard(`mhk-front.herokuapp.com/${lobbyId}`)}
            enabled={true}
          />
          <Tooltip tip='copyUrl' />
        </div>
      </div>
    </Container>
  );

  return (
    <Container className='info game'>
      {showGameStage &&
      <div className='info-gamestage'>
        {stage.display}
      </div>}
      <div className='game-control-buttons'>
        {showRoundBtn &&
          <Button onClick={nextRoundHandler}>
            NEXT ROUND
          </Button>
        }
        {showClearBtn &&
          <Button onClick={clearGameHandler}>
            CLEAR GAME
          </Button>
        }
      </div>
      <div className='info-lobbyid'>
        {userName}
      </div>
    </Container>
  );
};

export default Info;

  // const HideLobbyIdButton = () => (
  //   <div className='hidebutton-wrap'>
  //     <svg viewBox="0 0 324 67">
  //       <a href='#' onClick={hideLobbyIdHandler}>
  //         <path d="M302.5,3.333c-1.574,-2.098 -4.044,-3.333 -6.667,-3.333c-32.311,0 -242.805,0 -287.5,0c-4.602,0 -8.333,3.731 -8.333,8.333c0,12.809 0,37.192 -0,50c0,4.603 3.731,8.334 8.333,8.334c44.695,-0 255.189,-0 287.5,-0c2.623,-0 5.093,-1.235 6.667,-3.334c5.011,-6.68 16.182,-21.576 20.625,-27.5c1.111,-1.481 1.111,-3.518 0,-5c-4.443,-5.924 -15.614,-20.819 -20.625,-27.5Z"/>
  //         <text
  //           x='150'
  //           y='37'
  //           text-anchor='middle'
  //           alignment-baseline='middle'
  //         >
  //           {lobbyIdHidden ? 'SHOW LOBBY-ID' : 'HIDE LOBBY-ID'}
  //         </text>
  //       </a>
  //     </svg>
  //   </div>
  // );

  // const renderLobbyId = (render, id) => {
  //   if (!render) return id;
  //   return 'lobby id hidden';
  //   // return id.split('').map(ch => ch === '-' ? '•' : '•').join('');
  // }

  // const url = () => {
  //   return process.env.NODE_ENV === 'development'
  //     ? `mhkgame.com/lobby/${lobbyId}`
  //     : `${(process.env.REACT_APP_FRONTEND_URL).slice(9)}/lobby/${lobbyId}`;
  // };