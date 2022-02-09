// Chat //

import { useState, useContext, useEffect } from 'react';
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
  isStreamer,
}) => {

  const { myLobby } = useContext(UserContext);

  const [firstRender, setFirstRender] = useState(true);
  const [minimized, setMinimized] = useState(isStreamer);
  const [css, setCss] = useState(`first-render-${minimized ? 'min' : 'max'}`);

  function resizeChat() {
    if (firstRender) setFirstRender(false);
    setMinimized(!minimized);
    if (minimized) return setCss('max')
    return setCss('min');
  };

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
      onClick={resizeChat}
    />
  );

  const newMessageSubmitHandler = event => {
    event.preventDefault();
    newMessage();
  };

  return (<>
    <Container className={`chatbutton ${css}`}>
      <MinimizeChatButton
        className={css}
        icon='chat'
      />
    </Container>
    <Container className={`chat ${css}`}>
      {!minimized && <>
        <ChatFeed messages={messages} users={users} />
        <NewMessage
          onChange={(e) => setMessageText(e.target.value)}
          messages={messages}
          messageText={messageText}
          myLobby={myLobby}
          submitHandler={newMessageSubmitHandler}
        />
      </>}
    </Container>
  </>);

};

export default Chat;