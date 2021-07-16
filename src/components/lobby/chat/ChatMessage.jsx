import React from 'react';

const ChatMessage = ({ self, message }) => {

  const style = self ? 'self' : 'other';
  const isSysMessage = (message.sender === 'System')

  return (
    <div className={`chatmessage chatmessage-${style}`}>
      <span>{message.createdAt.slice(0,-6)}</span>
      <span>{message.sender.slice(0,-5)}:</span>
      <span className={`msgtext ${isSysMessage && 'sysMessage'}`}>{message.text}</span>
    </div>
  );
};

export default ChatMessage;
