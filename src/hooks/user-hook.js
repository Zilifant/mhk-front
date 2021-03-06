// User Hook

import { useState, useCallback } from 'react';

// Set up user state object that will be become userContext.
export const useUser = () => {
  const [user, setUser] = useState({
    userId: null,
    userName: null,
    myLobby: null,
    isStreamer: true,
    isDemo: false,
    checked: false,
  });

  const updateUserCtx = useCallback(({
    userId,
    userName,
    myLobby,
    isStreamer,
    isDemo,
  }) => {
    setUser({
      userId: userId,
      userName: userName,
      myLobby: myLobby,
      isStreamer: isStreamer,
      isDemo: isDemo,
      checked: true,
    });
  }, []);

  // Check that user did not somehow load into a different lobby than the one
  // they created/joined.
  const checkMyLobby = useCallback((currentLobby) => {
    return (user.myLobby === currentLobby);
  }, [user.myLobby]);

  return {
    user,
    checkMyLobby,
    updateUserCtx
  };
};