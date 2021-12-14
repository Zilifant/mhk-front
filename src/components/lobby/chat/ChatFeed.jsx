// ChatFeed //

import { useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../../context/contexts';
import { parse, render } from '../../../util/smd';
import { buildSMDString } from '../../../util/system-messages';
import { nanoid } from 'nanoid';

// Only used in ChatFeed.
const ChatMessage = ({
  message,
  isMine,
}) => {

  if (!message) return null; // TO DO: Test and remove this check.

  const meta = {
    wrapper: `msg-wrapper msg-in-chatfeed ${isMine ? 'self' : 'other'}`,
    parent: 'chatfeed',
    timestamp: 'block'
  };

  const built = buildSMDString(message, meta);
  const parsed = parse(built, meta);

  return render.block(parsed, meta)
};

const ChatFeed = ({ messages, users }) => {
  const { userId } = useContext(UserContext);

  // Automatically scroll to bottom of feed on new message.
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest'
    });
  }, [messages]);

  // Get color from message's `senderId` property. (System messages have
  // senderId of `app`.)
  function getColorId(message) {
    if (message.senderId === 'app') return 'default';
    const color = users.find(u => u.id === message.senderId).color;
    if (color) return color.id;
    return 'null-color';
  }

  // TO DO: Refactor to move div wrapper used to apply color into ChatMessage
  // or remove need for it entirely.
  return (
    <div className='chatfeed'>
      {messages.map((message) => (
        <div
          className={getColorId(message)}
          ref={scrollRef}
          key={nanoid()}> {/* TO DO: Is nanoid necessary here? */}
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
