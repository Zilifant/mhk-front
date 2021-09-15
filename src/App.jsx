import React, {
  useEffect,
  // useRef,
  // useState
} from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { useUser } from './hooks/user-hook';
import { useHttpClient } from './hooks/http-hook';
import { UserContext } from './context/contexts';
import Foyer from './components/lobby/Foyer';
import Landing from './components/landing/Landing';
import './styles/colors.css';
import './styles/mixins.scss';
import './styles/core.scss';
import './styles/animations.scss';
import './styles/svgs.scss';

function App() {
  console.log('%cApp','color:#79e6f9');
  const { user, checkMyLobby, updateUserCtx } = useUser();
  const { isLoading, sendRequest } = useHttpClient();
  // const [lobbyId, setLobbyId] = useState();
  // const [isMyLobby, setIsMyLobby] = useState();

  useEffect(() => {
    console.log('UserHook: fetchSess');
    const checkCookie = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/user/session`
        );
        updateUserCtx({
          userId: responseData.user?.id,
          userName: responseData.user?.userName,
          myLobby: responseData.user?.myLobby,
          isStreamer: responseData.user?.isStreamer
        });
        // setLobbyId(responseData.user?.myLobby);
      } catch (err) { console.log(err); };
    };
    checkCookie();
    // setCc(true)
  }, [updateUserCtx, sendRequest]);

  let routes;
  routes = (
    <Switch>
      <Route path='/' exact>
        <Landing />
      </Route>
      <Route path='/:lobbyURL'>
        <Foyer />
      </Route>
      <Route path='/lobby' exact>
        <Foyer />
      </Route>
      <Route path='/join' exact>
        <Foyer />
      </Route>
      <Redirect to='/' />
    </Switch>
  );

  return (
    <UserContext.Provider value={{
      userId: user.userId,
      userName: user.userName,
      myLobby: user.myLobby,
      isLeader: user.isLeader,
      isStreamer: user.isStreamer,
      checkMyLobby: checkMyLobby,
      updateUserCtx: updateUserCtx,
      checked: user.checked
    }}>
      {!isLoading && user.checked && <Router>
        <main className='app'>
          {routes}
        </main>
      </Router>}
    </UserContext.Provider>
  );
};

export default App;
