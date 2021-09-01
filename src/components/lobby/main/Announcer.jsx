import React, {
  // useState,
  useEffect,
} from 'react';
import { useChat } from '../../../hooks/chat-hook';
import Container from '../../shared/Container';
import ChatMessage from '../chat/ChatMessage';

import '../../../styles/announcer.css';
import '../../../styles/chat.css';

function msg(type, args, isInGame, senderId = 'app') {
  return {
    time: new Date().toLocaleTimeString().slice(0,-6),
    type,
    isInGame,
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
    lastAnnouncement,
    lastGameAnnouncement
  } = useChat(chat);

  useEffect(() => { subToAnnounce(); }, [subToAnnounce]);

  const [type, args] = lobby.startGameText(iAmLeader);

  if (lobby.gameOn) return (
    <Container className='announcer game'>
      <ChatMessage
        type='announcement'
        parent='announcer'
        message={lastGameAnnouncement()}
      />
    </Container>
  );

  return (
    <Container className='announcer nogame'>
      <ChatMessage
        type='status'
        parent='announcer'
        message={msg(type, args, false)}
      />
      <ChatMessage
        type='announcement'
        parent='announcer'
        message={lastAnnouncement()}
        vanish={true}
      />
    </Container>
  );
};

export default Announcer;