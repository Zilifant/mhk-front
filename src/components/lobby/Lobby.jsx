import React, {
  useEffect,
  useState,
  useContext
} from 'react';
// import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../hooks/http-hook';
import { useIO } from '../../hooks/io-hook';
import { SocketContext, UserContext } from '../../context/contexts';
import { getThisPlayer, lobbyMethods } from '../../util/utils';
import ErrorModal from '../modal/ErrorModal';
import Loading from '../shared/Loading';
import Grid from '../shared/Grid';
import Main from './main/Main';
import Chat from './chat/Chat';
import Dev from '../shared/Dev';

const Lobby = () => {
  console.log('%cLobby','color:#79f98e');
  // const lobbyURL = useParams().lobbyURL;
  const { myLobby, userId } = useContext(UserContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { socket } = useIO(); // init socket (useEffect inside hook)
  const [ lobby, setLobby ] = useState();
  const [joinConfirmed, setJoinConfirmed] = useState(false);

  const [chatMinimized, setChatMinimized] = useState(true);
  const minimizeChatHandler = () => setChatMinimized(!chatMinimized);
  const showChat = chatMinimized ? 'nochat' : 'chat';

  useEffect(() => {
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
      } catch (err) { console.log(err); }
    };
    fetchLobby();
  }, [ sendRequest, setLobby, userId, myLobby ]);

  useEffect(() => {
    const subToLobby = () => {
      socket.current.on('updateLobby', ({ lobby, data }) => {
        setLobby({...lobbyMethods, ...lobby});
        if (data?.event === 'userConnected' && data?.user.id === userId) {
          setJoinConfirmed(true);
        }
      });
    };
  subToLobby();
  }, [ socket, myLobby, setLobby, joinConfirmed, setJoinConfirmed, userId ]);

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
            asOverlay
            color='orange'
            text='Fetching lobby...'
          />
        }
        {!isLoading && !joinConfirmed &&
          <Loading
            asOverlay
            color='blue'
            text='Connecting to IO...'
          />
        }
        {!isLoading && lobby && joinConfirmed &&
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
            {lobby.id === 'z' && <Dev lobby={lobby} />}
          </Grid>
        }
      </React.Fragment>
    </SocketContext.Provider>
  );
};

export default Lobby;