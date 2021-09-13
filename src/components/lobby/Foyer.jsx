import React, { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/contexts';
import JoinThisLobby from './JoinThisLobby';
import Lobby from './Lobby';
import Grid from '../shared/Grid';

import '../../styles/landing.scss';

// Handles cases where users arrive directly at a lobby's URL
// If user has correct session data, Lobby is loaded, else JoinThisLobby is loaded

const Foyer = () => {
  // console.log('foyer');

  const { checkMyLobby, myLobby, checked } = useContext(UserContext);
  const lobbyURL = useParams().lobbyURL;
  const history = useHistory();

  const isGenericURL = lobbyURL === 'lobby';

  if (checked) {

    if (isGenericURL && !myLobby) {
      history.push('/');
      return null;
    };

    if (isGenericURL && myLobby) {
      // console.log('generic and mylobby');
      return <Lobby />;
    }

    if (!isGenericURL) {

      if (checkMyLobby(lobbyURL)) {
        // console.log('unique and mylobby');
        // return <Lobby />
        history.push('/lobby');
        return null;
      }

    }

  };

  return (
    <Grid className='foyer'>
      <JoinThisLobby lobbyId={lobbyURL} />
    </Grid>
  );
};

export default Foyer;
