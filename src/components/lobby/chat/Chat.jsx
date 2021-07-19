import React, {
  useContext,
  // useState,
  useEffect,
} from 'react';
import { UserContext } from '../../../context/contexts';
import { useHttpClient } from '../../../hooks/http-hook';
import { useChat } from '../../../hooks/chat-hook';
import ErrorModal from '../../modal/ErrorModal';
import Container from '../../shared/Container';
import ChatFeed from './ChatFeed';
import NewMessage from './NewMessage';
// import Button from '../ui-elements/Button';
// import { sysMsgs } from '../../util/utils';

import '../../../styles/chat.css';

const Chat = ({ chat }) => {
  // console.log('Chat');

  // const { socket } = useContext(SocketContext);
  const { myLobby } = useContext(UserContext);

  const { error, clearError } = useHttpClient();
  const {
    newMessage,
    subToChat,
    messages,
    messageText,
    setMessageText
  } = useChat(chat);

  // const [messages, setMessages] = useState(chat);
  // const [messageText, setMessageText] = useState('');

  useEffect(() => {
    subToChat();
    // let sysMessage;
    // const sysMessageBase = {
    //   sender: 'System',
    //   createdAt: new Date().toLocaleTimeString()
    // };

    // socket.current.on('readyUnready', props => {
    //   const readyState = (props.ready) ? 'ready!' : 'not ready.'
    //   sysMessage = {
    //     ...sysMessageBase,
    //     text: `${props.userId.slice(0,-5)} is ${readyState}`
    //   };
    //   setMessages((messages) => [...messages, sysMessage]);
    // });

    // socket.current.on('userConnected', props => {
    //   sysMessage = {
    //     ...sysMessageBase,
    //     text: `${props.user.id.slice(0,-5)} has joined the lobby.`
    //   };
    //   setMessages((messages) => [...messages, sysMessage]);
    // });

    // socket.current.on('userDisco', props => {
    //   const textP1 = `${props.discoUserId.slice(0,-5)} has left the lobby.`;
    //   let text;
    //   if (!props.newLeaderId) {
    //     text = textP1;
    //   } else {
    //     text = `${textP1} ${props.newLeaderId.slice(0,-5)} is the new Leader.`;
    //   };
    //   sysMessage = {
    //     ...sysMessageBase,
    //     text
    //   };
    //   setMessages((messages) => [...messages, sysMessage]);
    // });
  }, [subToChat]);

  // useEffect(() => {
  //   if (socket) socket.current.on('newMessage', message => {
  //     const incomingMessage = message;
  //     setMessages((messages) => [...messages, incomingMessage]);
  //   });
  // }, [socket]);

  const newMessageSubmitHandler = async event => {
    event.preventDefault();
    newMessage();
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
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
    </React.Fragment>
  );
};

export default Chat;

// {myLobby &&
//   <div className='form'>
//     <form className='new-message-form'>
//       <div><input
//         className='new-message-input'
//         placeholder='write something...'
//         onChange={(e) => setMessageText(e.target.value)}
//         value={messageText}
//       ></input></div>
//       <Button
//         disabled={!messageText}
//         onClick={newMessageSubmitHandler}
//       >
//         Send
//       </Button>
//       <Button
//         className='chat-temp'
//         type='button'
//         onClick={() => console.table(messages)}
//       >
//         LOG
//       </Button>
//       <Button
//         className='chat-temp'
//         type='button'
//         onClick={() => console.log(socket)}
//       >
//         SKT
//       </Button>
//     </form>
//   </div>
// }

// useEffect(() => {
//   const getMessagesFromDB = async () => {
//     try {
//       const responseData = await sendRequest(
//         `${process.env.REACT_APP_BACKEND_URL}/lobby/chat/${chat}/messages`
//       );
//       setMessages(responseData);
//     } catch (err) { console.log(err); };
//   };
//   getMessagesFromDB();
// }, [sendRequest, chat]);

// try {
//   await sendRequest(
//     `${process.env.REACT_APP_BACKEND_URL}/lobby/chat/${chat}/newmessage`,
//     'POST',
//     JSON.stringify({
//       sender: userId,
//       text: messageText,
//       createdAt: new Date().toLocaleTimeString()
//     }),
//     { 'Content-Type': 'application/json' },
//   );
//   setMessageText('');
// } catch (err) { console.log(err); }