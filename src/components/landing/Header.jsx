// Header //
// App title on landing page.

import Container from '../shared/Container';
import VideoModal from '../modal/VideoModal';

const Header = () => {

  const info = {
    src: 'https://www.youtube.com/embed/AuBmikjCgjI',
    title: 'How To Play'
  }

  return (
    <Container className='head'>
      <div className='landing-title'>MHK<span> BETA</span></div>
      <VideoModal
        className='rules header'
        btnClassName='gradient larger'
        buttonContent='how to play'
        info={info}
      />
    </Container>
  );
};

export default Header;
