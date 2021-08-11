import React, {
  useEffect,
  useState,
  useContext
} from 'react';
import { useParams } from 'react-router-dom';
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
  // console.log('%cLobby','color:#79f98e');
  const lobbyURL = useParams().lobbyURL;
  const { myLobby, userId } = useContext(UserContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { socket } = useIO(); // init socket (useEffect inside hook)
  const [ lobby, setLobby ] = useState();

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
        setLobby({...lobbyMethods, ...resData.lobby});
      } catch (err) { console.log(err); }
    };
    fetchLobby();
  }, [ sendRequest, setLobby, lobbyURL, userId ]);

  useEffect(() => {
    const subToLobby = () => {
      socket.current.onAny((event, data) => {
        if (event === 'newMessage') return;
        setLobby({...lobbyMethods, ...data.lobby});
      });
    };
  if (lobbyURL === myLobby) subToLobby();
  }, [ socket, lobbyURL, myLobby, setLobby ]);

  return (
    <SocketContext.Provider value={{ socket }}>
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && <Loading asOverlay color='orange' />}
        {!isLoading && lobby &&
            <Grid className={`lobby-${!!lobby.game ? 'game' : 'nogame'}`}>
              <Main
                lobby={lobby}
                thisPlayer={getThisPlayer(userId, lobby.game)}
                iAmLeader={lobby.leader === userId}
              />
              <Chat chat={lobby.chat} />
              <Dev lobby={lobby} />
            </Grid>
        }
      </React.Fragment>
    </SocketContext.Provider>
  );
};

export default Lobby;