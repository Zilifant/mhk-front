import { useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../../context/contexts';
import { parse, render } from '../../../util/smd';
import { buildSMDString } from '../../../util/system-messages';
import { nanoid } from 'nanoid';

const ChatMessage = ({
  message,
  isMine,
}) => {

  if (!message) return null;

  const style = isMine ? 'self' : 'other';

  const meta = {
    wrapper: `msg-wrapper msg-in-chatfeed ${style}`,
    parent: 'chatfeed',
    timestamp: 'block'
  };

  const built = buildSMDString(message, meta);
  const parsed = parse(built, meta);

  return render.block(parsed, meta)
};

const ChatFeed = ({ messages, users }) => {
  const { userId } = useContext(UserContext);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest"
    });
  }, [messages]);

  function getColorId(message) {
    if (message.senderId === 'app') return 'default';
    const color = users.find(u => u.id === message.senderId).color;
    if (color) return color.id;
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
            message={message}
            isMine={message.senderId === userId}
          />
        </div>
      ))}
    </div>
  );
};

export default ChatFeed;
