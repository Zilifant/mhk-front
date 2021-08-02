import React from 'react';
import { nanoid } from 'nanoid';

const ChatMessage = ({ isMine, message }) => {

  const style = isMine ? 'self' : 'other';

  const renderStyledText = (elements, parentCls='styled-text-wrapper') => (
    <div className={`${parentCls} ${style}`}>
      {elements.map(el => (
        <span key={nanoid()} className={el.style}>{el.string}</span>
        ))}
    </div>
  );

  if (message) return renderStyledText(message, 'announcement-wrapper');
  return null;
};

export default ChatMessage;
