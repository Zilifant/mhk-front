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

  const announcement = messages.filter(m => m.type !== 'userMessage').slice(-1)[0];

  return (
    <Container className='announcer'>
      <ChatMessage
        parent='announcer'
        message={announcement}
      />
    </Container>
  );
};

export default Announcer;