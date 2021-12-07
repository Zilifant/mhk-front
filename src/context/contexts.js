// Contexts
// Once assigned, these values all remain constant.

import React from 'react';

export const UserContext = React.createContext({
  userId: null,
  userName: null,
  myLobby: null,
  isStreamer: true, // Has the user turned on 'streaming mode'.
  checkMyLobby: () => {},
  updateUserCtx: () => {},
  checked: false // Has the app checked for the userData cookie.
});

export const SocketContext = React.createContext({
  socket: null
});
