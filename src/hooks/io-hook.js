// io hook

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