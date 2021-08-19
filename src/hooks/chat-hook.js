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

    const sub2Chat = () => {
      socket.current.on('newMessage', msg => {
        setMessages((messages) => [...messages, msg]);
      });
    };
    sub2Chat();

  }, [socket]);

  const subToAnnounce = useCallback(() => {

    const sub2Announce = () => {
      socket.current.on('updateLobby', ({ msg }) => {
        if (msg) return setMessages((messages) => [...messages, msg]);
        return console.log(`no msg`);
      });
    };
    sub2Announce();

  }, [socket]);

  return {
    newMessage,
    subToChat,
    subToAnnounce,
    messages,
    messageText,
    setMessageText
  };
};