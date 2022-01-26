// App

import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { useUser } from './hooks/user-hook';
import { useHttpClient } from './hooks/http-hook';
import { UserContext } from './context/contexts';
import { isDevEnv } from './util/utils';
import Demo from './components/demo/Demo';
import DemoLobby from './components/lobby/DemoLobby';
import Foyer from './components/lobby/Foyer';
import Landing from './components/landing/Landing';
import './styles/mixins.scss';
import './styles/core.scss';
import './styles/svgs.scss';
import './styles/buttons.scss';

function App() {
  if (isDevEnv) console.log('%cApp','color:#79e6f9');

  const { user, checkMyLobby, updateUserCtx } = useUser();
  const { isLoading, sendRequest } = useHttpClient('App');

  useEffect(() => {
    const checkCookie = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/user/cookie`
        );
        updateUserCtx({
          userId: responseData.user?.id,
          userName: responseData.user?.userName,
          myLobby: responseData.user?.myLobby,
          isStreamer: responseData.user?.isStreamer,
          isDemo: responseData.user?.isDemo
        });
      } catch (err) { console.log(err); };
    };
    checkCookie();
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
      <Route path={`/${/(lobby|join)/}`} exact>
        <Foyer />
      </Route>
      {/* <Route path='/join' exact>
        <Foyer />
      </Route> */}
      <Redirect to='/' />
    </Switch>
  );

  return (
    <UserContext.Provider value={{
      userId: user.userId,
      userName: user.userName,
      myLobby: user.myLobby,
      isStreamer: user.isStreamer,
      isDemo: user.isDemo,
      checkMyLobby: checkMyLobby,
      updateUserCtx: updateUserCtx,
      checked: user.checked
    }}>
      {/* `user.checked` prevents routes from loading before `isLoading`
      becomes true. */}
      {!isLoading && user.checked && <Router>
        <main className='app'>
          {routes}
        </main>
      </Router>}
    </UserContext.Provider>
  );
};

export default App;
