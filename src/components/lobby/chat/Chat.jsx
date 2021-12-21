// Chat //

import { useContext, useEffect } from 'react';
import { UserContext } from '../../../context/contexts';
import { useChat } from '../../../hooks/chat-hook';
import Container from '../../shared/Container';
import ChatFeed from './ChatFeed';
import NewMessage from './NewMessage';
import SVGButton from '../../shared/SVGButton';
import '../../../styles/chat.scss';

const Chat = ({
  chat,
  users,
  minimizeChatHandler,
  minimized
}) => {

  const { myLobby } = useContext(UserContext);

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

  // TO DO: Update icon or add text to make purpose clearer to user.
  const MinimizeChatButton = () => (
    <SVGButton
      icon='chat'
      className='minimize-chat'
      onClick={minimizeChatHandler}
    />
  );

  const newMessageSubmitHandler = event => {
    event.preventDefault();
    newMessage();
  };

  if (minimized) return (
    <Container className={`lobbychat min`}>
      <MinimizeChatButton />
    </Container>
  );

  return (
    <Container className={`lobbychat`}>
      <MinimizeChatButton />
      <ChatFeed messages={messages} users={users} />
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