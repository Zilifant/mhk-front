// Chat Hook //
// Provides functions used by Chat and Announcer components.
// TO DO: Generalize naming in this hook or create separate hook for Announcer.

import { useState, useContext, useCallback } from 'react';
import { UserContext, SocketContext } from '../context/contexts';
import { isDevEnv } from '../util/utils';

// `chat` arg is the lobby's chat property, an array of message data.
// It is used to initiate the `messages` state with any messages sent before
// this client's Chat component first rendered.
export const useChat = (chat) => {
  const { userId } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  const [messages, setMessages] = useState(chat);
  const [messageText, setMessageText] = useState('');

  // Used by Chat //

  const newMessage = () => {
    socket.current.emit('newMessage', {
      senderId: userId,
      text: messageText
    });
    setMessageText(''); // Clear input field after message sent.
  };

  // TO DO: Is useCallBack necessary here?
  const subToChat = useCallback(() => {

    const sub2Chat = () => {
      socket.current.on('newMessage', msg => {
        setMessages((messages) => [...messages, msg]);
      });
    };
    sub2Chat();

  }, [socket]);

  // Used by Chat and Announcer //

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
    return null;
  };

  // TO DO: Is useCallBack necessary here?
  const subToAnnounce = useCallback(() => {

    const subToPublicAnnounce = () => {
      socket.current.on('updateLobby', ({ msg }) => {
        if (msg) return setMessages((messages) => [...messages, msg]);
      });
    };

    const SubToPrivateAnnounce = () => {
      socket.current.on('privateAnnounce', msg => {
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