// import { useState } from 'react';
import { parseAndRender } from '../../../util/styled-text';

const ChatMessage = ({
  type,
  parent,
  message,
  isMine,
  vanish
}) => {

  const style = isMine ? 'self' : 'other';

  const meta = {
    wrapper: `msg-wrapper msg-in-${parent} ${style}`,
    parent: parent,
    isAnno: message.senderId === 'app',
    timestamp: parent === 'chatfeed' ? true : false
  };

  if (message) return parseAndRender(message, meta);
  return null;
};

export default ChatMessage;
