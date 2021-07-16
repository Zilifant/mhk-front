import React, {
  useEffect,
  useState,
  useContext
} from 'react';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../hooks/http-hook';
import { useIO } from '../../hooks/io-hook';
import { useGameIO } from '../../hooks/game-io-hook';
import { SocketContext, UserContext } from '../../context/contexts';
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

  // init socket; lobby-level subscriptions and state (useEffect inside hook)
  const { socket, leader, onlineUsers, canStart } = useIO();
  // game-level subscriptions and state (useEffect outside hook)
  const { game, setGame, gameOn, setGameOn, gameResult, subToGame } = useGameIO(socket);

  // Dynamic, game-specific data added to user object is not provided by userContext; this gets that data from the game object
  // TO DO: move this somewhere else
  function getThisPlayer(userId, game) {
    if (!game) return undefined;
    return game.players.find(player => player.id === userId);
  };

  useEffect(() => {
    // Probably redundant check that user is in the correct lobby
    if (lobbyURL === myLobby) subToGame();
  }, [lobbyURL, myLobby, subToGame]);

  useEffect(() => {
    const fetchLobby = async () => {
      // console.log('fetchLobby');
      try {
        const resData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/lobby/${lobbyURL}`
        );
        setLoadedLobby(resData.lobby);
        // load game info in case a user joins a lobby with a game in progress
        // TO DO: add functionality for case where user is not part of the current game
        if (resData.lobby.gameOn === true) {
          setGameOn(resData.lobby.gameOn);
          setGame(resData.lobby.game);
        };
      } catch (err) { console.log(err); }
    };
    fetchLobby();
  }, [sendRequest, lobbyURL, setGame, setGameOn]);

  return (
    <SocketContext.Provider value={{ socket: socket }}>
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && <Loading asOverlay />}
        {!isLoading && loadedLobby &&
          <Grid className='lobby'>
            <Main
              gameOn={gameOn}
              leader={leader}
              oUsers={onlineUsers}
              canStart={canStart}
              game={game}
              gameResult={gameResult}
              thisPlayer={getThisPlayer(userId, game)}
            />
            <Chat lobby={loadedLobby} />
          </Grid>
        }
      </React.Fragment>
    </SocketContext.Provider>
  );
};

export default Lobby;