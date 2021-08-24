// import React from 'react';
import { parseAndRender } from '../../../util/styled-text';

const ChatMessage = ({ parent, message, isMine }) => {

  const style = isMine ? 'self' : 'other';

  const meta = {
    wrapper: `msg-wrapper ${style}`,
    timestamp: parent === 'chatfeed' ? true : false
  };

  if (message) return parseAndRender(message, meta);
  return null;
};

export default ChatMessage;
