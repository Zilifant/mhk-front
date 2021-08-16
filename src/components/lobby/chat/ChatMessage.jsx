import React from 'react';
import { nanoid } from 'nanoid';

const ChatMessage = ({ isMine, message, type }) => {

  const style = isMine ? 'self' : 'other';

  const renderStyledText = (elements) => (
    <div className={`${elements[0].metaData || 'none'} msg-wrapper ${style}`}>
      {elements.map((el, i) => {
        if (i === 0) return null;
        return <span key={nanoid()} className={el.style}>{el.string}</span>
      })}
    </div>
  );

  // if (type === 'announcer' && message[0].metaData === 'user-message') return null;
  if (message) return renderStyledText(message);
  return null;
};

export default ChatMessage;
