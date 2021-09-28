import React, {
  // useState,
  // useContext,
  // useEffect
} from 'react';
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

// Context.Consumer alternative to context hook; uses a child that is an anon function that takes context data as param and returns the sub-components/elements that will need the context data

// const Header = () => {
//   console.log('Header');
//   return (
//     <UserContext.Consumer>
//       {(sess) => {
//         return (
//           <Container className="head">
//             <NavLink to="/" exact>Landing</NavLink>
//             <NavLink to={`/lobby/${testLobbyUrl}`} exact>Lobby</NavLink>
//             { sess.userId &&
//                 <span>{`${sess.userName}-${sess.userId.slice(-6)} ${sess.myLobby}`}</span>
//             }
//           </Container>
//         )
//       }}
//     </UserContext.Consumer>
//   );
// };
