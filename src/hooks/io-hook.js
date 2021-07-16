import { useRef, useEffect, useState, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/contexts';
import { io } from 'socket.io-client';

export const useIO = () => {
  // console.log('Hook: useIO');

  const { userId, myLobby } = useContext(UserContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [leader, setLeader] = useState();
  const [canStart, setCanStart] = useState(false);
  const socket = useRef();

  const lobbyURL = useParams().lobbyURL;

  const initSocket = useCallback(() => {
    // Probably redundant check that user is in the correct lobby
    if (lobbyURL === myLobby) {
      // console.log('IOHook: initSocket');

      socket.current = io(process.env.REACT_APP_SOCKET_URL);
      socket.current.emit('connectToLobby', {
        userId: userId,
        lobbyId: myLobby,
      });

      socket.current.on('userConnected', ({ usersOnline }) => {
        setOnlineUsers(usersOnline);
        setCanStart(false);
      });

      socket.current.on('readyUnready', ({ usersOnline, canStart }) => {
        setOnlineUsers(usersOnline);
        setCanStart(canStart);
      });

      socket.current.on('userDisco', ({ usersOnline, newLeaderId }) => {
        setOnlineUsers(usersOnline);
        console.log('usersOnline')
        if (newLeaderId) setLeader(newLeaderId);
      });
    };
  }, [lobbyURL, userId, myLobby]);

  useEffect(() => {
    initSocket();
    return () => {
      if (socket.current) socket.current.disconnect();
    };
  }, [initSocket]);

  return { socket, leader, onlineUsers, canStart };
};