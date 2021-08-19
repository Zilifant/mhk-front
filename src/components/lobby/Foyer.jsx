import React, { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/contexts';
import JoinThisLobby from './JoinThisLobby';
import Lobby from './Lobby';
import Grid from '../shared/Grid';

import '../../styles/landing.css';

// Handles cases where users arrive directly at a lobby's URL
// If user has correct session data, Lobby is loaded, else JoinThisLobby is loaded

const Foyer = () => {

  const { checkMyLobby, myLobby, checked } = useContext(UserContext);
  const lobbyURL = useParams().lobbyURL;
  const history = useHistory();

  const genURL = lobbyURL === 'lobby';

  console.log(lobbyURL);
  console.log(myLobby);
  console.log(checked);

  if (checked && genURL && !myLobby) {
    history.push('/');
    return null;
  }

  function uniqURL(lobbyURL) {
    return checkMyLobby(lobbyURL);
  }

  function genericURL(myLobby) {
    if (myLobby) return true;
    return false
  }

  const inMyLobby = genURL ? genericURL(myLobby) : uniqURL(lobbyURL);

  console.log(`inMyLobby: ${inMyLobby}`);

  if (inMyLobby) return (<Lobby />)

  return (
    <Grid className='foyer'>
      <JoinThisLobby lobbyId={lobbyURL} />
    </Grid>
  );
};

export default Foyer;
