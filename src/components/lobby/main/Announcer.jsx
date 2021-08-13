import React, {
  // useState,
  useEffect,
} from 'react';
import { useChat } from '../../../hooks/chat-hook';
import Container from '../../shared/Container';
import ChatMessage from '../chat/ChatMessage';

import '../../../styles/chat.css';

const Announcer = ({chat}) => {

  const {
    subToChat,
    messages
  } = useChat(chat);

  useEffect(() => { subToChat(); }, [subToChat]);

  return (
    <Container className='announcer'>
      <ChatMessage message={!!messages[0] && messages[messages.length-1]}/>
    </Container>
  );
};

export default Announcer;