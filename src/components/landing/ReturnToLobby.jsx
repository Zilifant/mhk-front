// ReturnToLobby //
// Renders when visitor has valid  userData cookie (i.e. matching a lobby that
// is still in server memory). Shows username and navlink to user's lobby.

import { forwardRef } from "react";
import { NavLink } from 'react-router-dom';

const ReturnToLobby = forwardRef(({userName}, ref) => {

  return (
    <div ref={ref} className='return-to-lobby-wrapper slide-in'>
      <span className='return-greet'>Welcome back, {userName}.</span>
      <NavLink className='return-link' to='/lobby' exact><p>return</p></NavLink>
      <span className='return-greet'>to your last lobby?</span>
    </div>
  );
});

export default ReturnToLobby;
