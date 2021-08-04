import React, {
  useEffect,
  useState,
  useContext
} from 'react';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../hooks/http-hook';
import { useIO } from '../../hooks/io-hook';
// import { useGame } from '../../hooks/game-hook';
import { SocketContext, UserContext } from '../../context/contexts';
import { getThisPlayer } from '../../util/utils';
import ErrorModal from '../modal/ErrorModal';
import Loading from '../shared/Loading';
import Grid from '../shared/Grid';
import Main from './main/Main';
// import Chat from './chat/Chat';
// import Button from '../ui-elements/Button';

const lobbyMethods = {
  numOnline() {
    return this.users.filter(u => u.isOnline === true).length;
  },
  numReady() {
    return this.users.filter(u => u.isReady === true).length;
  },
  usersOnline() {
    return this.users.filter(u => u.isOnline === true);
  },
  usersReady() {
    return this.users.filter(u => u.isReady === true);
  },
  canStart() {
    return (this.numReady() >= 3) && (this.numReady() === this.numOnline());
  }
};

const Lobby = () => {
  console.log('%cLobby','color:#79f98e');
  const { myLobby, userId } = useContext(UserContext);
  const lobbyURL = useParams().lobbyURL;
  // const [loadedLobby, setLoadedLobby] = useState();
  const [lobby, setLobby] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { socket } = useIO(); // init socket (useEffect inside hook)

  // lobby/game subscriptions and state (useEffect outside hook)
  // const {
  //   lobby, setLobby,
  //   game, setGame,
  //   gameOn, setGameOn,
  //   gameSettings, setGameSettings,
  //   subToGame,
  // } = useGame(socket);

  useEffect(() => {
    const subToLobby = () => {
      if (lobbyURL === myLobby) {
        socket.current.onAny((e, data) => {
          if (data.lobby) setLobby({...lobbyMethods, ...data.lobby});
        });
      };
    };
    subToLobby();
  }, [lobbyURL, myLobby, setLobby, socket]);

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
        console.log('request lobby');
        // const repProperties = {
        //   onlineUsers() {
        //     return this.users.filter(u => u.isOnline === true);
        //   }
        // }
        setLobby({...lobbyMethods, ...resData.lobby});
        // setLoadedLobby(resData.lobby);
        // setGameSettings(resData.lobby.gameSettings);
        // setGameOn(resData.lobby.gameOn);
        // setGame(resData.lobby.game);
        // load game info in case user joins lobby with game in progress
        // TO DO: add case when user not part of current game
      } catch (err) { console.log(err); }
    };
    fetchLobby();
  }, [
      sendRequest,
      lobbyURL,
      userId,
      setLobby,
      // setGame,
      // setGameOn,
      // setGameSettings
  ]);

  return (
    <SocketContext.Provider value={{ socket }}>
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && <Loading asOverlay color='orange' />}
        {!isLoading && lobby &&
          <Grid className='lobby'>
            <Main
              lobby={lobby}
              gameOn={lobby.gameOn}
              gameSettings={lobby.gameSettings}
              game={lobby.game}
              thisPlayer={getThisPlayer(userId, lobby.game)}
              iAmLeader={lobby.leader === userId}
              chat={lobby.chat}
            />
            {/* <Chat chat={loadedLobby.chat} /> */}
          </Grid>
        }
      </React.Fragment>
    </SocketContext.Provider>
  );
};

export default Lobby;