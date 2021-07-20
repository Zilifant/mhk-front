import {
  useState,
  // useRef,
  // useEffect,
  useContext,
  useCallback
} from 'react';
import { UserContext, SocketContext } from '../context/contexts';

export const useChat = (chat) => {
  const { userId } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  const [messages, setMessages] = useState(chat);
  const [messageText, setMessageText] = useState('');

  const newMessage = () => {
    socket.current.emit('newMessage', {
      sender: userId,
      text: messageText
    });
    setMessageText('');
  };

  // TO DO: useCB necessary?
  const subToChat = useCallback(() => {

    socket.current.onAny((e, data) => {
      if (data.msg) setMessages((messages) => [...messages, data.msg]);
    });

    socket.current.on('newMessage', message => {
      const incomingMessage = message;
      setMessages((messages) => [...messages, incomingMessage]);
    });

  }, [socket]);

  return {
    newMessage,
    subToChat,
    messages,
    messageText,
    setMessageText
  };
};