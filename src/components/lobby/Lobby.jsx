import React, {
  useEffect,
  useState,
  useContext
} from 'react';
import { useHttpClient } from '../../hooks/http-hook';
import { useIO } from '../../hooks/io-hook';
import { SocketContext, UserContext } from '../../context/contexts';
import { getThisPlayer, lobbyMethods, DEV } from '../../util/utils';
import ErrorModal from '../modal/ErrorModal';
import Loading from '../shared/Loading';
import Grid from '../shared/Grid';
import Main from './main/Main';
import Chat from './chat/Chat';
import Footer from '../shared/Footer';

const Lobby = () => {
  if (DEV) console.log('%cLobby','color:#79f98e');
  const { myLobby, userId } = useContext(UserContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient('Lobby');
  const { socket } = useIO();
  const [lobby, setLobby] = useState();
  const [isFetched, setIsFetched] = useState(false);
  const [isSubbed, setIsSubbed] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const [chatMinimized, setChatMinimized] = useState(!DEV);
  const minimizeChatHandler = () => setChatMinimized(!chatMinimized);
  const showChat = chatMinimized ? 'nochat' : 'chat';

  // console.log(`Connected: ${isConnected}, Loading: ${isLoading}, Fetched: ${isFetched}`);

  useEffect(() => {
    // console.log('UE: fetchLobby');
    const fetchLobby = async () => {
      try {
        const resData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/lobby/${myLobby}`,
          'POST',
          JSON.stringify({
            userId: userId
          }),
          { 'Content-Type': 'application/json' },
        );
        setLobby({...lobbyMethods, ...resData.lobby});
        setIsFetched(true);
        // console.log('lobby fetched');
      } catch (err) { console.log(err); }
    };
    fetchLobby();
  }, [
    sendRequest,
    userId,
    myLobby,
    setLobby,
    setIsFetched,
  ]);

  useEffect(() => {
    // console.log('UE: subToLobby');
    const subToLobby = () => {
      socket.current.on('updateLobby', ({ lobby, data }) => {
        setLobby(prev => ({...prev, ...lobby}));
        // console.log('lobby updated');

        if (data?.event === 'userConnected' && data?.user.id === userId) {
          setIsConnected(true);
          // console.log('connected');
        };

      });
      setIsSubbed(true);
      // console.log('subbed');
    };

    if (socket && isFetched) subToLobby()

  }, [
    socket,
    userId,
    myLobby,
    isFetched,
    setLobby,
    setIsSubbed,
    setIsConnected,
  ]);

  useEffect(() => {
    // console.log('UE: connectToLobby');
    const connectToLobby = () => {
      socket.current.emit('connectToLobby', {
        userId: userId,
        lobbyId: myLobby,
      });
    };

    if (isSubbed) connectToLobby();

  }, [
    socket,
    userId,
    myLobby,
    isSubbed
  ]);

  const thisPlayer = lobby && getThisPlayer(userId, lobby.game);

  const gridVariant = () => {
    return lobby.gameOn && thisPlayer.role === 'ghost' ? 'game-ghost'
         : lobby.gameOn ? 'game'
         : 'nogame'
  };

  return (
    <SocketContext.Provider value={{ socket: socket }}>
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading &&
          <Loading
            overlay
            color='orange'
            content='Fetching lobby...'
          />
        }
        {lobby && !isConnected &&
          <Loading
            overlay
            color='blue'
            content='Connecting to IO...'
          />
        }
        {!isLoading && lobby && lobby.game?.isResolvingAccusal &&
          <Loading
            overlay
            suspenseful
            color='purple'
            content='Investigating...'
          />
        }
        {!isLoading && lobby && isConnected &&
          <Grid className={`lobby-${gridVariant()} ${showChat}`}>
            <Main
              lobby={lobby}
              thisPlayer={getThisPlayer(userId, lobby.game)}
              iAmLeader={lobby.leader === userId}
            />
            <Chat
              chat={lobby.chat}
              users={lobby.users}
              minimizeChatHandler={minimizeChatHandler}
              minimized={chatMinimized}
            />
            <Footer
              showClearBtn={lobby.leader === userId && lobby.gameOn}
            />
          </Grid>
        }
      </React.Fragment>
    </SocketContext.Provider>
  );
};

export default Lobby;