import {
  useRef,
  useEffect,
  // useCallback
} from 'react';
import { io } from 'socket.io-client';

export const useIO = () => {
  // console.log('HOOK: useIO');
  const socket = useRef();

  // const initSocket = useCallback(() => {
  //   // console.log('HOOK: CB: initSocket');
  //   socket.current = io(process.env.REACT_APP_SOCKET_URL);
  // }, []);

  useEffect(() => {
    // console.log('HOOK: EF: initSocket');
    // initSocket();
    socket.current = io(process.env.REACT_APP_SOCKET_URL);
    return () => {
      if (socket.current) socket.current.disconnect();
    };
  }, []);

  return { socket };
};