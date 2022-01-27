// Landing //

import { useContext } from 'react';
import { UserContext } from '../../context/contexts';
import Header from './Header';
import Footer from '../shared/Footer';
import LobbyForm from './LobbyForm';
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
      <LobbyForm formType={'newLobby'} />
      <LobbyForm formType={'joinLobby'} />
      <Footer />
    </div>
  );
};

export default Landing;
