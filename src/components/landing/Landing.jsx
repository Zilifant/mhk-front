import React, {
  useContext
} from 'react';
import { UserContext } from '../../context/contexts';
import Header from './Header';
import ReturnToLobby from './ReturnToLobby';
import NewLobby from './NewLobby';
import JoinLobby from './JoinLobby';
import '../../styles/landing.scss';

const Landing = () => {
  // console.log('%cLanding','color:#f579f9');

  const { userId, userName, myLobby } = useContext(UserContext);

  return (
    <div className='landing'>
      <Header />
      {userId && <ReturnToLobby
        userId={userId}
        userName={userName}
        myLobby={myLobby}
      />}
      <NewLobby />
      <JoinLobby />
    </div>
  );
};

export default Landing;
