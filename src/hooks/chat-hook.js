import {
  // useState,
  // useRef,
  // useEffect,
  useContext,
  // useCallback
} from 'react';
import { UserContext, SocketContext } from '../context/contexts';

export const useChat= () => {
  // console.log('Hook: useChat');
  const { userId, myLobby } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  const newMessage = (messageText) => {
    socket.current.emit('newMessage', {
      sender: userId,
      text: messageText,
      lobby: myLobby,
      createdAt: new Date().toLocaleTimeString()
    });
  };

  return {
    newMessage
  };
};