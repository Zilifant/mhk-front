import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../context/contexts';
import JoinThisLobby from './JoinThisLobby';
import Lobby from './Lobby';
import Grid from '../shared/Grid';

import '../../styles/landing.css';

// Handles cases where users arrive directly at a lobby's URL
// If user has correct session data, Lobby is loaded, else JoinThisLobby is loaded

const Foyer = () => {
  // console.log('%cFoyer','color:#ecf979');
  const lobbyURL = useParams().lobbyURL;
  const { checkMyLobby } = useContext(UserContext);
  const inMyLobby = checkMyLobby(lobbyURL);

  if (inMyLobby) {
    return (<Lobby />)
  } else {
    return (
      <Grid className='foyer'>
        <JoinThisLobby lobbyId={lobbyURL} />
      </Grid>
    );
  };
};

export default Foyer;
