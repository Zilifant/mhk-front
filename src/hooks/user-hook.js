import {
  useState,
  // useEffect,
  useCallback
} from 'react';
// import { useHttpClient } from './http-hook';

export const useUser = () => {
  // console.log('Hook: useUser');
  // const { sendRequest } = useHttpClient('user-hook');
  const [user, setUser] = useState({
    userId: null,
    userName: null,
    myLobby: null,
    isLeader: false,
    isStreamer: true,
    leaderOf: null,
    checked: false
  });

  const updateUserCtx = useCallback(({
    userId,
    userName,
    myLobby,
    isLeader,
    isStreamer,
    leaderOf
  }) => {
    // console.log('UserHook: updateUserCtx');
    setUser({
      userId: userId,
      userName: userName,
      myLobby: myLobby,
      isLeader: !!isLeader,
      isStreamer: isStreamer,
      leaderOf: leaderOf,
      checked: true
    });
  }, []);

  // verifies that user did not somehow load a different lobby than the one they created/joined.
  const checkMyLobby = useCallback((currentLobby) => {
    // console.log('checkMyLobby');
    return (user.myLobby === currentLobby);
  }, [user.myLobby]);

  // when user arrives, checks if they have a cookie, allowing them to rejoin their lobby with the same userId
  // useEffect(() => {
  //   console.log('UserHook: fetchSess');
  //   const checkCookie = async () => {
  //     try {
  //       const responseData = await sendRequest(
  //         `${process.env.REACT_APP_BACKEND_URL}/user/session`
  //       );
  //       updateUserCtx({
  //         userId: responseData.user.id,
  //         userName: responseData.user.userName,
  //         myLobby: responseData.user.myLobby
  //       });
  //     } catch (err) { console.log(err); };
  //   };
  //   checkCookie();
  // }, [updateUserCtx, sendRequest]);

  // const checkCookie = async () => {
  //   try {
  //     const responseData = await sendRequest(
  //       `${process.env.REACT_APP_BACKEND_URL}/user/session`
  //     );
  //     updateUserCtx({
  //       userId: responseData.user.id,
  //       userName: responseData.user.userName,
  //       myLobby: responseData.user.myLobby
  //     });
  //   } catch (err) { console.log(err); };
  // };

  // when user arrives, checks if they have a session, allowing them to rejoin their lobby with the same userId
  // useEffect(() => {
  //   // console.log('UserHook: fetchSess');
  //   const fetchSess = async () => {
  //     try {
  //       const responseData = await sendRequest(
  //         `${process.env.REACT_APP_BACKEND_URL}/user/session`
  //       );
  //       updateUserCtx({
  //         userId: responseData.user.id,
  //         userName: responseData.user.userName,
  //         myLobby: responseData.user.myLobby
  //       });
  //     } catch (err) { console.log(err); };
  //   };
  //   fetchSess();
  // }, [updateUserCtx, sendRequest]);

  return {
    user,
    checkMyLobby,
    updateUserCtx,
    // checkCookie
  };
};