// import React from 'react';
import { parseAndRender } from '../../../util/styled-text';

const ChatMessage = ({ isMine, message }) => {

  const style = isMine ? 'self' : 'other';

  if (message) return parseAndRender(message, `msg-wrapper ${style}`)
  // if (message) return renderStyledText(message, `msg-wrapper ${style}`);
  return null;
};

export default ChatMessage;
