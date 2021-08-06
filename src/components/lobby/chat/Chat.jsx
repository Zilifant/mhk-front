import React, {
  useContext,
  useState,
  // useEffect,
} from 'react';
import { UserContext } from '../../../context/contexts';
import { useChat } from '../../../hooks/chat-hook';
import Container from '../../shared/Container';
import ChatFeed from './ChatFeed';
import NewMessage from './NewMessage';
// import Button from '../ui-elements/Button';

import '../../../styles/chat.css';
import Button from '../../ui-elements/Button';

const Chat = ({ chat, min }) => {
  // console.log('Chat');

  const { myLobby } = useContext(UserContext);

  const [minimized, setMinimized] = useState(true);

  const minimizeHandler = () => setMinimized(!minimized);

  const {
    newMessage,
    // subToChat,
    messages,
    messageText,
    setMessageText
  } = useChat(chat);

  // useEffect(() => { subToChat(); }, [subToChat]);

  if (min) return (
    <Container className={`lobbychat ${minimized ? 'min' : 'max'}`} parentGrid='lobby'>
      <Button
        className='toggle-chat'
        onClick={minimizeHandler}
      >
        {minimized ? 'SHOW' : 'HIDE'}
      </Button>
    </Container>
  );

  const newMessageSubmitHandler = event => {
    event.preventDefault();
    newMessage();
  };

  return (
    <Container className='lobbychat' parentGrid='lobby'>
      <ChatFeed messages={messages} />
      <NewMessage
        onChange={(e) => setMessageText(e.target.value)}
        messages={messages}
        messageText={messageText}
        myLobby={myLobby}
        submitHandler={newMessageSubmitHandler}
      />
    </Container>
  );
};

export default Chat;