import React, {
  // useState,
  useEffect,
} from 'react';
import { useChat } from '../../../hooks/chat-hook';
import Container from '../../shared/Container';
import ChatMessage from '../chat/ChatMessage';

import '../../../styles/chat.css';

const Announcer = ({ chat }) => {

  const {
    subToAnnounce,
    messages
  } = useChat(chat);

  useEffect(() => { subToAnnounce(); }, [subToAnnounce]);

  return (
    <Container className='announcer'>
      <ChatMessage type='announcer' message={messages[messages.length-1]}/>
    </Container>
  );
};

export default Announcer;