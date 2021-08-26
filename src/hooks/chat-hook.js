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
      senderId: userId,
      text: messageText
    });
    setMessageText('');
  };

  // TO DO: useCB necessary?
  const subToChat = useCallback(() => {

    const sub2Chat = () => {
      socket.current.on('newMessage', msg => {
        setMessages((messages) => [...messages, msg]);
      });
    };
    sub2Chat();

  }, [socket]);

  const lastAnnouncement = () => {
    const last = messages.filter(m => m.type !== 'userMessage').slice(-1)[0];
    const welcome = {
      time: new Date().toLocaleTimeString().slice(0,-6),
      type: 'welcome',
      args: [],
      senderId: 'app'
    };
    return last ? last : welcome;
  };

  const subToAnnounce = useCallback(() => {

    const sub2Announce = () => {
      socket.current.on('updateLobby', ({ msg }) => {
        if (msg) return setMessages((messages) => [...messages, msg]);
      });
      socket.current.on('announcement', ({ msg }) => {
        if (msg) return setMessages((messages) => [...messages, msg]);
      });
    };
    sub2Announce();

  }, [socket]);

  return {
    newMessage,
    subToChat,
    subToAnnounce,
    lastAnnouncement,
    messages,
    messageText,
    setMessageText
  };
};