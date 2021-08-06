import React, {
  // useState,
  useContext,
  // useEffect
} from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../context/contexts';
import Container from './Container';

const Header = () => {

  const { userName, userId, myLobby } = useContext(UserContext);

  return (
    <Container className="head">
      <NavLink className='navlink' to="/" exact>LANDING</NavLink>
      { userId &&
        <>
          <NavLink className='navlink' to={`/lobby/${myLobby}`} exact>LOBBY</NavLink>
          <span className='sessinfo'>
            {`User: ${userName}`}
          </span>
          <span className='sessinfo'>
            {`Lobby: ${myLobby === 'z' ? 'Splendid-Monolith-7873' : myLobby}`}
          </span>
        </>
      }
    </Container>
  );
};

export default Header;

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
