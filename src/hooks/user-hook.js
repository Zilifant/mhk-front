// user hook

import { useState, useCallback } from 'react';

export const useUser = () => {
  const [user, setUser] = useState({
    userId: null,
    userName: null,
    myLobby: null,
    isStreamer: true,
    checked: false
  });

  const updateUserCtx = useCallback(({
    userId,
    userName,
    myLobby,
    isStreamer
  }) => {
    setUser({
      userId: userId,
      userName: userName,
      myLobby: myLobby,
      isStreamer: isStreamer,
      checked: true
    });
  }, []);

  // verifies that user did not somehow load into a different lobby than the
  // one they created/joined.
  const checkMyLobby = useCallback((currentLobby) => {
    return (user.myLobby === currentLobby);
  }, [user.myLobby]);

  return {
    user,
    checkMyLobby,
    updateUserCtx
  };
};