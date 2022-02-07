// Landing //

import { useContext, useRef, useEffect } from 'react';
import { UserContext } from '../../context/contexts';
import { gsap } from 'gsap';
import Container from '../shared/Container';
import Header from './Header';
import Intro from './Intro';
import ReturnToLobby from './ReturnToLobby';
import LobbyForm from './LobbyForm';
import Footer from '../shared/Footer';
import '../../styles/landing.scss';
import '../../styles/forms.scss';

const Landing = ({ lobbyId }) => {
  // `lobbyId` will only be defined if Landing is rendered from Foyer.

  const { userId, userName, myLobby } = useContext(UserContext);

  const delays = userId ? [.1, .3, .4, .5, .6] : [.1, .2, null, .3, .4];

  const headerRef = useRef();
  const introRef = useRef();
  const returnRef = useRef();
  const newLobbyRef = useRef();
  const joinLobbyRef = useRef();

  useEffect(() => {
    gsap.to(headerRef.current,             { y: '100vh', delay: delays[4] })
    gsap.to(introRef.current,              { y: '100vh', delay: delays[3] })
    if (userId) gsap.to(returnRef.current, { y: '100vh', delay: delays[2] })
    gsap.to(newLobbyRef.current,           { y: '100vh', delay: delays[1], 'z-index': 2 })
    gsap.to(joinLobbyRef.current,          { y: '100vh', delay: delays[0], 'z-index': 1 })
  });

  return (
    <div className='grid--landing'>
      <Header ref={headerRef} />
      <Intro ref={introRef} />

      {!lobbyId && <Container className='lobby-forms'>
        {userId && <ReturnToLobby
          ref={returnRef}
          userId={userId}
          userName={userName}
          myLobby={myLobby}
        />}
        <LobbyForm ref={newLobbyRef} formType={'newLobby'} />
        <LobbyForm ref={joinLobbyRef} formType={'joinLobby'} />
      </Container>}

      {lobbyId && <Container className='lobby-forms'>
        <LobbyForm ref={joinLobbyRef} formType={'joinThis'} lobbyId={lobbyId} />
      </Container>}

      <Footer />
    </div>
  );
};

export default Landing;
