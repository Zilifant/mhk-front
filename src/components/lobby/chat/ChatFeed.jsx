import React, {
  useContext,
  useEffect,
  useRef
} from 'react';
import { UserContext } from '../../../context/contexts';
import ChatMessage from './ChatMessage';
import { nanoid } from 'nanoid';

const ChatFeed = ({ messages }) => {
  const { userId } = useContext(UserContext);
  const scrollRef = useRef();

  useEffect(() => {
    // scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight)
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest"
    });
  }, [messages]);

  return (
    <div className='chatfeed'>
      {messages.map((message) => (
        <div
          ref={scrollRef}
          key={nanoid()}>
          <ChatMessage
            parent='chatfeed'
            message={message}
            isMine={message.senderId === userId}
          />
        </div>
      ))}
    </div>
  );
};

export default ChatFeed;
