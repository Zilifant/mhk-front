// Foyer //

// Janky logic that allows users to reach a lobby by entering a unique url/id,
// while obscuring the id by immediately pushing the user to generic /join and
// /lobby urls.

// This component will recursively handle all combinations of urls and
// userData, eventually funneling users to the lobby matching their userData
// cookie, or to the landing page.

import { useContext, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/contexts';
import LobbyForm from '../landing/LobbyForm';
import Lobby from './Lobby';
import '../../styles/landing.scss';

const Foyer = () => {

  const { checkMyLobby, myLobby, checked } = useContext(UserContext);
  const lobbyURL = useParams().lobbyURL;
  const history = useHistory();
  // This component may push the user to another url and re-render, and we may
  // need to preserve the initial url.
  const url = useRef()

  // If the url is anything other than 'join', remember it.
  if (lobbyURL !== 'join') {
    url.current = lobbyURL;
  };

  // If the url is 'join'...
  if (lobbyURL === 'join') {

    // ...and we have remembered another url, it means that this component
    // pushed the user to /join, and the remembered url is a specific lobby.
    // So, load JoinThis version of LobbyForm with that url.
    if (!!url.current) {
      return (
        <div className='grid grid--foyer'>
          <LobbyForm formType={'joinThis'} lobbyId={url.current} />
        </div>
      );

      // If the ref is undefined, it means the user reached this url from
      // outside of this component (e.g. reloading the page). So, push them to
      // the landing.
    } else {
      history.push('/');
      return null;
    };

  };

  // The url is not 'join'; check if it is the generic lobby url.
  const isGenericURL = lobbyURL === 'lobby';

  if (checked) {

    // If user has arrived at /lobby but has no userData cookie, push them to
    // the landing.
    if (isGenericURL && !myLobby) {
      history.push('/');
      return null;
    };

    // If user has arrived at /lobby and has userData cookie, load their lobby.
    if (isGenericURL && myLobby) {
      return <Lobby />;
    };

    // If user has arrived at a lobby url...
    if (!isGenericURL) {

      // If user matching userData cookie, load their lobby.
      if (checkMyLobby(lobbyURL)) {
        history.push('/lobby');
        return null;
      };

    };

  };

  // The url must be a unique lobby url. So, push the user to /join, triggering
  // this component to re-render.
  history.push('/join');
  return null
};

export default Foyer;
