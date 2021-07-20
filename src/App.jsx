import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { useUser } from './hooks/user-hook';
// import { useHttpClient } from './hooks/http-hook';
import { UserContext } from './context/contexts';
import Foyer from './components/lobby/Foyer';
import Landing from './components/landing/Landing';
// import Container from './components/shared/Container';
// import Button from './components/ui-elements/Button';
import './styles/default.css';

function App() {
  // console.log('%cApp','color:#79e6f9');
  const { user, checkMyLobby, updateUserCtx } = useUser();
  // const { sendRequest } = useHttpClient();

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

  // const getDataHandler = async event => {
  //   console.log('getDataHandler');
  //   event.preventDefault();

  //   try {
  //     const responseData = await sendRequest(
  //       `${process.env.REACT_APP_BACKEND_URL}/admin/data`
  //     );
  //     console.log(responseData);
  //   } catch (err) { console.log(`Err: ${err}`); };
  // };

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
        {/* <Container className='uni-footer'>
          <Button
            type='button'
            onClick={getDataHandler}
          >
            data
          </Button>
        </Container> */}
      </Router>
    </UserContext.Provider>
  );
};

export default App;
