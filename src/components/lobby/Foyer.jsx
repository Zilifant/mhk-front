import { useContext, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/contexts';
import JoinLobby from '../landing/JoinLobby';
import Lobby from './Lobby';
import Grid from '../shared/Grid';

import '../../styles/landing.scss';

// Handles cases where users arrive directly at a lobby's URL
// If user has correct session data, Lobby is loaded, else JoinThisLobby is loaded

const Foyer = () => {

  const { checkMyLobby, myLobby, checked } = useContext(UserContext);
  const lobbyURL = useParams().lobbyURL;
  const history = useHistory();
  const url = useRef()

  const JoinThisLobby = () => (
    <Grid className='foyer'>
      <JoinLobby lobbyId={url.current} />
    </Grid>
  );

  if (lobbyURL !== 'join') {
    url.current = lobbyURL;
    // console.log(`assigning: ${url.current}`);
  };

  if (lobbyURL === 'join') {
    // console.log(`join: ${url.current}`);
    return <JoinThisLobby />
  };

  const isGenericURL = lobbyURL === 'lobby';

  if (checked) {
    // console.log('checked');

    if (isGenericURL && !myLobby) {
      // console.log('generic and not mylobby');
      history.push('/');
      return null;
    };

    if (isGenericURL && myLobby) {
      // console.log('generic and mylobby');
      return <Lobby />;
    };

    if (!isGenericURL) {

      if (checkMyLobby(lobbyURL)) {
        // console.log('unique and mylobby');
        history.push('/lobby');
        return null;
      };

    };

  };

  // console.log('unique and not mylobby');

  history.push('/join');
  return null
};

export default Foyer;
