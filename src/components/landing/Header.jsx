import React, {
  // useState
} from 'react';
import Container from '../shared/Container';
// import InfoModal from '../shared/InfoModal';
import Video from '../shared/Video';
// import { rules } from '../../util/utils';

const Header = () => {

  const info = {
    src: 'https://www.youtube.com/embed/AuBmikjCgjI',
    title: 'How To Play'
  }

  return (
    <Container className='head'>
      <div className='landing-title'>MHK<span> BETA</span></div>
      <Video
        className='rules header nobg'
        buttonContent='how to play'
        info={info}
      />
    </Container>
  );
};

export default Header;
