import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { useUser } from './hooks/user-hook';
import { UserContext } from './context/contexts';
import Foyer from './components/lobby/Foyer';
import Landing from './components/landing/Landing';
import './styles/default.css';

function App() {
  console.log('%cApp','color:#79e6f9');
  const { user, checkMyLobby, updateUserCtx } = useUser();

  let routes;
  routes = (
    <Switch>
      <Route path='/' exact>
        <Landing />
      </Route>
      <Route path='/lobby/:lobbyURL' exact>
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
      checkMyLobby: checkMyLobby,
      updateUserCtx: updateUserCtx
    }}>
      <Router>
        <main className='app'>
          {routes}
        </main>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
