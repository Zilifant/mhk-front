import { useRef, useEffect, useContext, useCallback } from 'react';
import { UserContext } from '../context/contexts';
import { io } from 'socket.io-client';

export const useIO = () => {
  console.log('HOOK: useIO');
  const { userId, myLobby } = useContext(UserContext);
  const socket = useRef();

  const initSocket = useCallback(() => {
    console.log('HOOK: CB: initSocket');
    socket.current = io(process.env.REACT_APP_SOCKET_URL);
    socket.current.emit('connectToLobby', {
      userId: userId,
      lobbyId: myLobby,
    });
  }, [userId, myLobby]);

  useEffect(() => {
    console.log('HOOK: EF: initSocket');
    initSocket();
    return () => {
      if (socket.current) socket.current.disconnect();
    };
  }, [initSocket]);

  return { socket };
};