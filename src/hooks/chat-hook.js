// Chat Hook //
// Provides functions used by Chat and Announcer components.
// TO DO: Generalize naming in this hook or create separate hook for Announcer.

import { useState, useContext, useCallback } from 'react';
import { UserContext, SocketContext } from '../context/contexts';

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

  // Determine what message to show when the Announcer component first renders
  // and there is not a game active.
  const lastAnnouncement = () => {
    // Check for the most recently saved system message.
    const last = messages.filter(m => m.type !== 'userMessage').slice(-1)[0];
    // Structure welcome message data for `buildSMDString` module.
    // TO DO: Move this elsewhere.
    const welcome = {
      type: 'welcome',
      args: [],
      senderId: 'app'
    };
    // If a saved system message was found, return that, else return the
    // welcome message.
    return !!last ? last : welcome;
  };

  // Determine what message to show when the Announcer component first renders
  // and there is an active game.
  const lastGameAnnouncement = () => {
    // Get the most recently saved in-game system message.
    const lga = messages.filter(m => !!m.isInGame).slice(-1)[0];
    // This should always find a message; but if not, return null.
    return !!lga ? lga : null;
  };

  // TO DO: Is useCallBack necessary here?
  const subToAnnounce = useCallback(() => {

    // Subscribe to general announcements.
    const subToPublicAnnounce = () => {
      socket.current.on('updateLobby', ({ msg }) => {
        // Not all `updateLobby` events send a message.
        if (msg) return setMessages((messages) => [...messages, msg]);
      });
    };

    // Subscribe to announcements only sent to specific clients.
    // Currently only used to send a notification when a user attempts to join
    // a lobby in a second browser window/tab with the same cookie data.
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