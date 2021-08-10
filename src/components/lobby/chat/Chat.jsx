import React, {
  // useContext,
  // useState,
  // useEffect,
} from 'react';
// import { UserContext } from '../../../context/contexts';
// import { useChat } from '../../../hooks/chat-hook';
import Container from '../../shared/Container';
// import ChatFeed from './ChatFeed';
// import NewMessage from './NewMessage';
import Button from '../../ui-elements/Button';
// import { IoChatboxEllipsesSharp } from 'react-icons/io5';
import '../../../styles/chat.css';

const Chat = ({ chat }) => {
  // console.log('Chat');

  // const { myLobby } = useContext(UserContext);

  const minimized = true;
  // const [minimized, setMinimized] = useState(false);

  // const minimizeHandler = () => setMinimized(!minimized);

  // const {
  //   newMessage,
  //   subToChat,
  //   messages,
  //   messageText,
  //   setMessageText
  // } = useChat(chat);

  // useEffect(() => { subToChat(); }, [subToChat]);

  const MinimizeChatButton = () => (
    <Button
      className='minimize-chat'
      // onClick={minimizeHandler}
    >
    {minimized ? 'C' : 'HIDE CHAT'}
    </Button>
  );

  if (minimized) return (
    <Container className={`lobbychat ${minimized ? 'min' : 'max'}`} parentGrid='lobby'>
      <MinimizeChatButton />
    </Container>
  );

  // const newMessageSubmitHandler = event => {
  //   event.preventDefault();
  //   newMessage();
  // };

  // return (
  //   <Container className='lobbychat' parentGrid='lobby'>
  //     <MinimizeChatButton />
  //     <ChatFeed messages={messages} />
  //     <NewMessage
  //       onChange={(e) => setMessageText(e.target.value)}
  //       messages={messages}
  //       messageText={messageText}
  //       myLobby={myLobby}
  //       submitHandler={newMessageSubmitHandler}
  //     />
  //   </Container>
  // );
};

export default Chat;