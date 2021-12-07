// Contexts

import React from 'react';

export const UserContext = React.createContext({
  userId: null,
  userName: null,
  myLobby: null,
  isLeader: false,
  isStreamer: true, // Has the user turned on 'streaming mode'.
  checkMyLobby: () => {},
  updateUserCtx: () => {},
  checked: false // Has the app checked for the userData cookie.
});

export const SocketContext = React.createContext({
  socket: null
});
