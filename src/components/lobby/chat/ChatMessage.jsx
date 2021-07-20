import React from 'react';
import { nanoid } from 'nanoid';

const ChatMessage = ({ isMine, message }) => {

  const style = isMine ? 'self' : 'other';

  if (message.sender === undefined) {
    const renderStyledText = (elements, parentCls='styled-text-wrapper') => (
      <div className={parentCls}>
        {elements.map(el => (
          <span key={nanoid()} className={el.style}>{el.text}</span>
          ))}
      </div>
    );
    return renderStyledText(message, 'announcement-wrapper');
  };

  const isSysMessage = (message.sender === 'System')

  if (message.sender !== null ) {
    return (
      <div className={`chatmessage chatmessage-${style}`}>
        <span>{message.createdAt.slice(0,-6)}</span>
        <span>{message.sender.slice(0,-5)}:</span>
        <span className={`msgtext ${isSysMessage && 'sysMessage'}`}>{message.text}</span>
      </div>
    );
  };
};

export default ChatMessage;
