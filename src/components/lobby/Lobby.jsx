// Lobby //
// Called by Foyer, only for users who have matching userContext data.

// On initial render, sends userContext data to fetch correct lobby via HTTP,
// then subscribes to lobby's socket.io room for future data updates.

import React, { useEffect, useState, useContext } from 'react';
import { useHttpClient } from '../../hooks/http-hook';
import { useIO } from '../../hooks/io-hook';
import { SocketContext, UserContext } from '../../context/contexts';
import { getThisPlayer, lobbyMethods, isDevEnv } from '../../util/utils';
import ErrorModal from '../modal/ErrorModal';
import Loading from '../shared/Loading';
import Grid from '../shared/Grid';
import Main from './main/Main';
import Chat from './chat/Chat';
import Footer from '../shared/Footer';

const Lobby = () => {
  if (isDevEnv) console.log('%cLobby','color:#79f98e');

  const { myLobby, userId } = useContext(UserContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient('Lobby');

  // Track initial HTTP requests and socket.io connections, ensuring that they
  // occur in the correct order.

  // Initiate the socket.io client and connect to the socket.io server.
  const { socket } = useIO();
  const [lobby, setLobby] = useState();
  // Has the HTTP request successfully fetched lobby data from the server?
  const [isFetched, setIsFetched] = useState(false);
  // Has the client successfully subscribed to socket.io server?
  const [isSubbed, setIsSubbed] = useState(false);
  // Has this client broadcast their connection to the lobby's socket.io room
  // and recieved a response from the socket.io server?
  // TO DO: update naming around this event to better distinguish between
  // joining the room and the general client socket connection.
  const [isConnected, setIsConnected] = useState(false);

  // Track how chat component should be rendered.
  const [chatMinimized, setChatMinimized] = useState(!isDevEnv);
  const minimizeChatHandler = () => setChatMinimized(!chatMinimized);
  const showChat = chatMinimized ? 'nochat' : 'chat';

  // FIRST: Fetch the lobby data via HTTP.
  // (useIO will also have created the socket.)
  useEffect(() => {
    const fetchLobby = async () => {
      try {
        const resData = await sendRequest(
          // TO DO: Backend route no longer needs to be unique per lobby; send
          // myLobby in JSON instead.
          `${process.env.REACT_APP_BACKEND_URL}/lobby/${myLobby}`,
          'POST',
          JSON.stringify({
            userId: userId
          }),
          { 'Content-Type': 'application/json' },
        );
        // Mixin methods (can't be sent via JSON).
        setLobby({...lobbyMethods, ...resData.lobby});
        setIsFetched(true);
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

  // SECOND: Subscribe to the socket.io server.
  useEffect(() => {
    const subToLobby = () => {
      socket.current.on('updateLobby', ({ lobby, data }) => {
        setLobby(prev => ({...prev, ...lobby}));

        // FOURTH: Recieve confirmation from socket.io server that user joined
        // the lobby's room.
        if (data?.event === 'userConnected' && data?.user.id === userId) {
          setIsConnected(true);
        };

      });
      setIsSubbed(true);
    };

    if (socket && isFetched) subToLobby();

  }, [
    socket,
    userId,
    myLobby,
    isFetched,
    setLobby,
    setIsSubbed,
    setIsConnected,
  ]);

  // THIRD: Join the lobby's room on the socket.io server.
  useEffect(() => {
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

  // Apply different css class to Grid based on if game is active and if the
  // current user has the Ghost role.
  const gridVariant = () => {
    return lobby.gameOn && thisPlayer.role === 'ghost' ? 'game-ghost'
         : lobby.gameOn ? 'game'
         : 'nogame'
  };

  return (
    <SocketContext.Provider value={{ socket: socket }}>
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {/* Show overlay while waiting for HTTP request. */}
        {isLoading &&
          <Loading
            overlay
            color='orange'
            content='Fetching lobby...'
          />
        }
        {/* Show overlay while waiting for socket.io connection (only after HTTP request has resolved successfully). */}
        {lobby && !isConnected &&
          <Loading
            overlay
            color='blue'
            content='Connecting to IO...'
          />
        }
        {/* Show overlay in game during suspensful delay on accusal.
        TO DO: can this be moved? */}
        {!isLoading && lobby && lobby.game?.isResolvingAccusal &&
          <Loading
            overlay
            suspenseful
            color='purple'
            content='Investigating...'
          />
        }
        {/* FIFTH: Render lobby after all HTTP and socket.io tasks have resolved successfully. */}
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