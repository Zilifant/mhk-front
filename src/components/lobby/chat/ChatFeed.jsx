import React, {
  // useContext,
  useEffect,
  useRef
} from 'react';
// import { UserContext } from '../../../context/contexts';
import ChatMessage from './ChatMessage';
import { nanoid } from 'nanoid';

const ChatFeed = ({ messages }) => {
  // const { userId } = useContext(UserContext);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className='chatfeed'>
      {messages.map((message) => (
        <div
          ref={scrollRef}
          key={nanoid()}>
          <ChatMessage
            message={message}
            // isMine={message.sender === userId}
            // time={message.createdAt}
            // sender={message.sender}
            // text={message.text}
            // key={nanoid()}
          />
        </div>
      ))}
    </div>
  );
};

export default ChatFeed;
