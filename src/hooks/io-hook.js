import { useRef, useEffect, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/contexts';
import { io } from 'socket.io-client';

export const useIO = () => {
  const { userId, myLobby } = useContext(UserContext);
  const socket = useRef();
  const lobbyURL = useParams().lobbyURL;

  const initSocket = useCallback(() => {
    // Probably redundant check that user is in the correct lobby
    if (lobbyURL === myLobby) {

      socket.current = io(process.env.REACT_APP_SOCKET_URL);
      socket.current.emit('connectToLobby', {
        userId: userId,
        lobbyId: myLobby,
      });
    };
  }, [lobbyURL, userId, myLobby]);

  useEffect(() => {
    initSocket();
    return () => {
      if (socket.current) socket.current.disconnect();
    };
  }, [initSocket]);

  return { socket };
};