import Container from '../shared/Container';
import VideoModal from '../shared/VideoModal';

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
        btnClassName='flat'
        buttonContent='how to play'
        info={info}
      />
    </Container>
  );
};

export default Header;
