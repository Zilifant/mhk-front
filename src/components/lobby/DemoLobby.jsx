// Lobby //

import React, { useEffect, useState, useContext } from 'react';
import { useHttpClient } from '../../hooks/http-hook';
import { UserContext } from '../../context/contexts';
import { getThisPlayer, lobbyMethods, isDevEnv } from '../../util/utils';
import ErrorModal from '../modal/ErrorModal';
import Loading from '../shared/Loading';
import Grid from '../shared/Grid';
import Main from './main/Main';
import Chat from './chat/Chat';
import Footer from '../shared/Footer';

const DemoLobby = () => {
  if (isDevEnv) console.log('%cDemoLobby','color:#79f98e');

  const { myLobby, userId } = useContext(UserContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient('DemoLobby');

  const [lobby, setLobby] = useState();

  // Track how Chat component should be rendered. Must be tracked here as Grid
  // variant partially depends on this state.
  const [chatMinimized, setChatMinimized] = useState(true);
  const minimizeChatHandler = () => setChatMinimized(!chatMinimized);
  const showChat = chatMinimized ? 'nochat' : 'chat';

  useEffect(() => {
    const fetchLobby = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/lobby/get`,
          'POST',
          JSON.stringify({
            userId: userId,
            lobbyId: myLobby,
          }),
          { 'Content-Type': 'application/json' },
        );
        setLobby({...lobbyMethods, ...responseData.lobby});
      } catch (err) { console.log(err); }
    };
    fetchLobby();
  }, [
    sendRequest,
    userId,
    myLobby,
    setLobby,
  ]);

  const thisPlayer = lobby && getThisPlayer(userId, lobby.game);

  // Apply different css class to Grid based on if game is active and if the
  // current user has the Ghost role.
  const gridVariant = () => {
    return lobby.gameOn && thisPlayer.role === 'ghost' ? 'game-ghost'
         : lobby.gameOn ? 'game'
         : 'nogame'
  };

  const [newMsg, setNewMsg] = useState();

  useEffect(() => {
    function handleMsgEvent(e) {
      if (e.origin !== 'http://localhost:3000') return console.log(e.origin);
      setNewMsg(e.data);
      console.log(e.data);
    };

    window.addEventListener('message', (e) => handleMsgEvent(e));

    return () => {
      window.removeEventListener('message', (e) => handleMsgEvent(e));
    };

  }, [setNewMsg]);

  return (
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
      {/* FIFTH: Render lobby after all HTTP and socket.io tasks have
          resolved successfully. */}
      {!isLoading && lobby &&
        <Grid className={`lobby-${gridVariant()} ${showChat}`}>
          <Main
            msg={newMsg}
            lobby={lobby}
            thisPlayer={getThisPlayer(userId, lobby.game)}
            iAmLeader={lobby.leader === userId}
          />
          <Chat
            isDemo={lobby.isDemo}
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
  );
};

export default DemoLobby;