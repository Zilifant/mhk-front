// ReturnToLobby //
// Renders when visitor has valid  userData cookie (i.e. matching a lobby that
// is still in server memory). Shows username and navlink to user's lobby.

import { NavLink } from 'react-router-dom';
import Container from '../shared/Container';

const ReturnToLobby = ({userName}) => {

  return (
    <Container className="returntolobby">
      <NavLink className='return-link' to='/lobby' exact>
        return to lobby
      </NavLink>
      <span className='return-username'>
        {userName}
      </span>
    </Container>
  );
};

export default ReturnToLobby;
