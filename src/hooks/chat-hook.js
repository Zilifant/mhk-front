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
    // console.log('subtochat')
    let sysMessage;
    const sysMessageBase = {
      sender: 'System',
      createdAt: new Date().toLocaleTimeString()
    };

    socket.current.on('readyUnready', props => {
      const readyState = (props.ready) ? 'ready!' : 'not ready.'
      sysMessage = {
        ...sysMessageBase,
        text: `${props.userId.slice(0,-5)} is ${readyState}`
      };
      setMessages((messages) => [...messages, sysMessage]);
    });
  
    socket.current.on('userConnected', props => {
      sysMessage = {
        ...sysMessageBase,
        text: `${props.user.id.slice(0,-5)} has joined the lobby.`
      };
      setMessages((messages) => [...messages, sysMessage]);
    });
  
    socket.current.on('userDisco', props => {
      const textP1 = `${props.discoUserId.slice(0,-5)} has left the lobby.`;
      let text;
      if (!props.newLeaderId) {
        text = textP1;
      } else {
        text = `${textP1} ${props.newLeaderId.slice(0,-5)} is the new Leader.`;
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