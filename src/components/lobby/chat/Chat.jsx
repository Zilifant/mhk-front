import React, {
  useContext,
  useState,
  useEffect,
} from 'react';
import { UserContext } from '../../../context/contexts';
import { useChat } from '../../../hooks/chat-hook';
import Container from '../../shared/Container';
import ChatFeed from './ChatFeed';
import NewMessage from './NewMessage';
import Button from '../../ui-elements/Button';
// import { HiChat } from 'react-icons/hi';
import '../../../styles/chat.css';

const Chat = ({ chat }) => {

  // const minimized = true;
  const { myLobby } = useContext(UserContext);

  const [minimized, setMinimized] = useState(false);

  const minimizeHandler = () => setMinimized(!minimized);

  const {
    newMessage,
    subToChat,
    subToAnnounce,
    messages,
    messageText,
    setMessageText
  } = useChat(chat);

  useEffect(() => {
    subToChat();
    subToAnnounce();
  }, [subToChat, subToAnnounce]);

  const MinimizeChatButton = () => (
    <Button
      className='minimize-chat'
      onClick={minimizeHandler}
    >
    {minimized ? 'CHAT' : 'HIDE'}
    </Button>
  );

  if (minimized) return (
    <Container className={`lobbychat min`}>
      <MinimizeChatButton />
    </Container>
  );

  const newMessageSubmitHandler = event => {
    event.preventDefault();
    newMessage();
  };

  return (
    <Container className='lobbychat'>
      <MinimizeChatButton />
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