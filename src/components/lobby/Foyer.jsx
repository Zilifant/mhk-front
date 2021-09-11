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

  const { checkMyLobby, myLobby, checked } = useContext(UserContext);
  const lobbyURL = useParams().lobbyURL;
  const history = useHistory();

  const genURL = lobbyURL === 'lobby';

  if (checked) {

    if (genURL && !myLobby) {
      history.push('/');
      return null;
    };

    if (genURL && myLobby) return (<Lobby />);

    if (!genURL) {

      if (checkMyLobby(lobbyURL)) {
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
