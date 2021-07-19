import {
  useState,
  // useRef,
  // useEffect,
  useContext,
  useCallback
} from 'react';
import { UserContext, SocketContext } from '../context/contexts';

export const useChat = (chat) => {
  // console.log('Hook: useChat');
  const { userId, myLobby } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  const [messages, setMessages] = useState(chat);
  const [messageText, setMessageText] = useState('');

  const newMessage = () => {
    socket.current.emit('newMessage', {
      sender: userId,
      text: messageText,
      lobby: myLobby,
      createdAt: new Date().toLocaleTimeString()
    });
    setMessageText('');
  };

  const subToChat = useCallback(() => {
    // console.log('subToChat')
    let sysMessage;
    const sysMessageBase = {
      sender: 'System',
      createdAt: new Date().toLocaleTimeString()
    };

    socket.current.on('readyUnready', data => {
      const readyState = (data.ready) ? 'ready!' : 'not ready.'
      sysMessage = {
        ...sysMessageBase,
        text: `${data.userId.slice(0,-5)} is ${readyState}`
      };
      setMessages((messages) => [...messages, sysMessage]);
    });
  
    socket.current.on('userConnected', data => {
      sysMessage = {
        ...sysMessageBase,
        text: `${data.user.id.slice(0,-5)} has joined the lobby.`
      };
      setMessages((messages) => [...messages, sysMessage]);
    });
  
    socket.current.on('userDisco', data => {
      const textP1 = `${data.discoUserId.slice(0,-5)} has left the lobby.`;
      let text;
      if (!data.newLeaderId) {
        text = textP1;
      } else {
        text = `${textP1} ${data.newLeaderId.slice(0,-5)} is the new Leader.`;
      };
      sysMessage = {
        ...sysMessageBase,
        text
      };
      setMessages((messages) => [...messages, sysMessage]);
    });

    socket.current.on('newMessage', message => {
      const incomingMessage = message;
      setMessages((messages) => [...messages, incomingMessage]);
    });

  }, [socket]);

  // const subToChat = () => {
    

  // };

  return {
    newMessage,
    subToChat,
    messages,
    messageText,
    setMessageText
  };
};