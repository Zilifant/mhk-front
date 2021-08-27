import React, {
  useContext,
  useEffect,
  useRef
} from 'react';
import { UserContext } from '../../../context/contexts';
import ChatMessage from './ChatMessage';
import { nanoid } from 'nanoid';

const ChatFeed = ({ messages, users }) => {
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

  function getColorId(message) {
    if (message.senderId === 'app') return 'default';
    const color = users.find(u => u.id === message.senderId).color;
    console.log(color.id);
    if (color) return color.id;
    console.log('error null-color');
    return 'null-color';
  }

  return (
    <div className='chatfeed'>
      {messages.map((message) => (
        <div
          className={getColorId(message)}
          ref={scrollRef}
          key={nanoid()}>
          <ChatMessage
            parent='chatfeed'
            message={message}
            isMine={message.senderId === userId}
            users={users}
          />
        </div>
      ))}
    </div>
  );
};

export default ChatFeed;
