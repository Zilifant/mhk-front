// Landing //
// TO DO: consolidate NewLobby and JoinLobby into single component that renders
// as New or Join depending on a prop.

import { useContext } from 'react';
import { UserContext } from '../../context/contexts';
import Header from './Header';
import Footer from '../shared/Footer';
import NewLobby from './NewLobby';
import JoinLobby from './JoinLobby';
import ReturnToLobby from './ReturnToLobby';
import '../../styles/landing.scss';
import '../../styles/forms.scss';

const Landing = () => {

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
      <Footer />
    </div>
  );
};

export default Landing;
