import React from 'react';

export const UserContext = React.createContext({
  userId: null,
  userName: null,
  myLobby: null,
  isLeader: false,
  isStreamer: true,
  checkMyLobby: () => {},
  updateUserCtx: () => {},
  checked: false
});

export const SocketContext = React.createContext({
  socket: null
});

// returns an object that is not a component, but which *contains* a component, so capitalized like a component
// set the default context here

// Context.Consumer alternative to context hook; uses a child that is an anon function that takes context data as param and returns the sub-components/elements that will need the context data

// Context.Provider will crash if used with a default value, unless you also give it a `value` prop that is an object the same as the default (but this can now be changed by state and such)

// context-management component
// export const UserContextProvider = props => {
//   return <UserContext.Provider>{props.children}</UserContext.Provider>;
// };