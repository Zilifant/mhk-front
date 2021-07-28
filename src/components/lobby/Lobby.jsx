import React, {
  useEffect,
  useState,
  useContext
} from 'react';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../hooks/http-hook';
import { useIO } from '../../hooks/io-hook';
import { useGame } from '../../hooks/game-hook';
import { SocketContext, UserContext } from '../../context/contexts';
import { getThisPlayer } from '../../util/utils';
import ErrorModal from '../modal/ErrorModal';
import Loading from '../shared/Loading';
import Grid from '../shared/Grid';
import Main from './main/Main';
import Chat from './chat/Chat';
// import Button from '../ui-elements/Button';

const Lobby = () => {
  // console.log('%cLobby','color:#79f98e');
  const { myLobby, userId } = useContext(UserContext);
  const lobbyURL = useParams().lobbyURL;
  const [loadedLobby, setLoadedLobby] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { socket } = useIO(); // init socket (useEffect inside hook)

  // lobby/game subscriptions and state (useEffect outside hook)
  const {
    game, setGame,
    gameOn, setGameOn,
    gameSettings, setGameSettings,
    subToGame,
    gameResult,
    leaderId, setLeaderId,
    onlineUsers,
    canStart
  } = useGame(socket);

  useEffect(() => {
    // Probably redundant check that user is in the correct lobby
    if (lobbyURL === myLobby) subToGame();
  }, [lobbyURL, myLobby, subToGame]);

  useEffect(() => {
    const fetchLobby = async () => {
      try {
        const resData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/lobby/${lobbyURL}`,
          'POST',
          JSON.stringify({
            userId: userId
          }),
          { 'Content-Type': 'application/json' },
        );
        setLoadedLobby(resData.lobby);
        setLeaderId(resData.lobby.leader);
        setGameSettings(resData.lobby.gameSettings);
        // load game info in case a user joins a lobby with a game in progress
        // TO DO: add functionality for case where user is not part of the current game
        if (resData.lobby.gameOn === true) {
          setGameOn(resData.lobby.gameOn);
          setGame(resData.lobby.game);
        };
      } catch (err) { console.log(err); }
    };
    fetchLobby();
  }, [sendRequest, lobbyURL, userId, setGame, setGameOn, setLeaderId, setGameSettings]);

  console.log(game);

  return (
    <SocketContext.Provider value={{ socket }}>
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && <Loading asOverlay color='orange' />}
        {!isLoading && loadedLobby && gameSettings &&
          <Grid className='lobby'>
            <Main
              gameOn={gameOn}
              leaderId={leaderId}
              oUsers={onlineUsers}
              canStart={canStart}
              gameSettings={gameSettings}
              game={game}
              gameResult={gameResult}
              thisPlayer={!!game && getThisPlayer(userId, game)}
              iAmLeader={leaderId === userId}
            />
            <Chat chat={loadedLobby.chat} />
          </Grid>
        }
      </React.Fragment>
    </SocketContext.Provider>
  );
};

export default Lobby;