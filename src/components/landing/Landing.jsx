// Landing //

import { useContext } from 'react';
import { UserContext } from '../../context/contexts';
import Container from '../shared/Container';
import Header from './Header';
import Intro from './Intro';
import ReturnToLobby from './ReturnToLobby';
import LobbyForm from './LobbyForm';
import Footer from '../shared/Footer';
import '../../styles/landing.scss';
import '../../styles/forms.scss';

const Landing = () => {

  const { userId, userName, myLobby } = useContext(UserContext);

  return (
    <div className='grid--landing'>
      <Header />
      <Intro />
      <Container className='lobby-forms'>
        {userId && <ReturnToLobby
          userId={userId}
          userName={userName}
          myLobby={myLobby}
        />}
        <LobbyForm formType={'newLobby'} />
        <LobbyForm formType={'joinLobby'} />
      </Container>
      <Footer />
    </div>
  );
};

export default Landing;
