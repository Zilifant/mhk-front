import { useState, useContext, useCallback } from 'react';
import { UserContext, SocketContext } from '../context/contexts';
import { isDevEnv } from '../util/utils';

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
    return !!last ? last : welcome;
  };

  const lastGameAnnouncement = () => {
    const lga = messages.filter(m => !!m.isInGame).slice(-1)[0];
    if (!!lga) return lga;
    if (isDevEnv) console.log('no last game anno');
    return null;
  };

  // TO DO: useCB necessary?
  const subToAnnounce = useCallback(() => {

    const subToPublicAnnounce = () => {
      socket.current.on('updateLobby', ({ msg }) => {
        if (msg) return setMessages((messages) => [...messages, msg]);
      });
    };

    const SubToPrivateAnnounce = () => {
      socket.current.on('privateAnnounce', msg => {
        console.log(msg);
        return setMessages((messages) => [...messages, msg]);
      });
    };

    subToPublicAnnounce();
    SubToPrivateAnnounce();

  }, [socket]);

  return {
    newMessage,
    subToChat,
    subToAnnounce,
    lastAnnouncement,
    lastGameAnnouncement,
    messages,
    messageText,
    setMessageText
  };
};