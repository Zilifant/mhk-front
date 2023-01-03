// Landing //

import { useContext, useEffect, useRef } from 'react';
// import { useHistory } from 'react-router-dom';
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

  // const [isDeparting, setIsDeparting] = useState(false);

  // const history = useHistory();

  // function departHandler() {
  //   setIsDeparting(true);
  //   setTimeout(() => history.push('/lobby'), 1000);
  // }

  const delays = userId
    ? [0.1, 0.3, 0.4, 0.5, 0.6]
    : [0.1, 0.2, null, 0.3, 0.4];

  const headerRef = useRef();
  const introRef = useRef();
  const returnRef = useRef();
  const newLobbyRef = useRef();
  const joinLobbyRef = useRef();

  useEffect(() => {
    gsap.to(headerRef.current, { y: '100vh', delay: delays[4] });
    gsap.to(introRef.current, { y: '100vh', delay: delays[3] });
    if (userId) gsap.to(returnRef.current, { y: '100vh', delay: delays[2] });
    gsap.to(newLobbyRef.current, {
      y: '100vh',
      delay: delays[1],
      'z-index': 2,
    });
    gsap.to(joinLobbyRef.current, {
      y: '100vh',
      delay: delays[0],
      'z-index': 1,
    });
  });
  // ${isDeparting ? 'departing' : ''}
  return (
    <div className={`grid--landing`}>
      <Header ref={headerRef} />

      <Intro ref={introRef} />
      {!lobbyId && (
        <Container className="lobby-forms">
          {userId && (
            <ReturnToLobby
              ref={returnRef}
              userId={userId}
              userName={userName}
              myLobby={myLobby}
              // departHandler={departHandler}
            />
          )}
          <LobbyForm
            ref={newLobbyRef}
            formType={'newLobby'}
            // departHandler={departHandler}
          />
          <LobbyForm
            ref={joinLobbyRef}
            formType={'joinLobby'}
            // departHandler={departHandler}
          />
        </Container>
      )}

      {lobbyId && (
        <Container className="lobby-forms">
          <LobbyForm
            ref={joinLobbyRef}
            formType={'joinThis'}
            lobbyId={lobbyId}
            // departHandler={departHandler}
          />
        </Container>
      )}

      <Footer />
    </div>
  );
};

export default Landing;
