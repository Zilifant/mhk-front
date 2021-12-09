// SOCKET.IO Hook //
// Initializes the socket.io client and connects to the socket.io server;
// closes connection if the Lobby component closes.

import { useRef, useEffect } from 'react';
import { io } from 'socket.io-client';

export const useIO = () => {
  const socket = useRef();

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_SOCKET_URL);
    return () => {
      if (socket.current) socket.current.disconnect();
    };
  }, []);

  return { socket };
};