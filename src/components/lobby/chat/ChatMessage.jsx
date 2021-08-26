// import React from 'react';
import { parseAndRender } from '../../../util/styled-text';

const ChatMessage = ({ parent, message, isMine }) => {

  const style = isMine ? 'self' : 'other';

  const meta = {
    wrapper: `msg-wrapper ${style}`,
    timestamp: parent === 'chatfeed' ? true : false
  };

  // const msg = (type, args, senderId = 'app') => {
  //   return {
  //     time: new Date().toLocaleTimeString().slice(0,-6),
  //     type,
  //     args,
  //     senderId,
  //   }
  // };

  // const messsage = msg('accusation', [{
  //   accuser: 'accuser-0000',
  //   accusee: 'accusee-0000',
  //   evidence: ['evidence1', 'evidence2']
  // }]);

  // console.log(messsage);

  if (message) return parseAndRender(message, meta);
  return null;
};

export default ChatMessage;
