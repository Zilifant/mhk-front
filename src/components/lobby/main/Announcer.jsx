import React, {
  // useState,
  useEffect,
} from 'react';
import { useChat } from '../../../hooks/chat-hook';
import Container from '../../shared/Container';
import ChatMessage from '../chat/ChatMessage';

import '../../../styles/announcer.css';
import '../../../styles/chat.css';

function msg(type, args, senderId = 'app') {
  return {
    time: new Date().toLocaleTimeString().slice(0,-6),
    type,
    args,
    senderId,
  }
};

const Announcer = ({
  chat,
  iAmLeader,
  lobby
}) => {

  const {
    subToAnnounce,
    lastAnnouncement
  } = useChat(chat);

  useEffect(() => { subToAnnounce(); }, [subToAnnounce]);

  const [type, args] = lobby.startGameText(iAmLeader);

  return (
    <Container className='announcer'>
      <ChatMessage
        type='status'
        parent='announcer'
        message={msg(type, args)}
      />
      <ChatMessage
        type='announcement'
        parent='announcer'
        message={lastAnnouncement()}
      />
    </Container>
  );
};

export default Announcer;