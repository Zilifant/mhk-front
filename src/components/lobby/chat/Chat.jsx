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
  isDemo,
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
    if (isDemo) return;
    subToChat();
    subToAnnounce();
  }, [subToChat, subToAnnounce, isDemo]);

  // TO DO: Update icon or add text to make purpose clearer to user.
  const MinimizeChatButton = ({ className, icon }) => (
    <SVGButton
      icon={icon}
      className={className}
      onClick={minimizeChatHandler}
    />
  );

  const newMessageSubmitHandler = event => {
    event.preventDefault();
    newMessage();
  };

  if (minimized) return (
    <Container className='chatbutton'>
      <MinimizeChatButton
        className='maximize'
        icon='chat'
      />
    </Container>
  );

  return (<>
    <Container className='chatbutton'>
      <MinimizeChatButton
        className='minimize'
        icon='chat'
      />
    </Container>

    <Container className={`lobbychat`}>
      <ChatFeed messages={messages} users={users} />
      <NewMessage
        onChange={(e) => setMessageText(e.target.value)}
        messages={messages}
        messageText={messageText}
        myLobby={myLobby}
        submitHandler={newMessageSubmitHandler}
      />
    </Container>
  </>);

};

export default Chat;