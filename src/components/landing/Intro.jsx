// Landing Page Intro //

import { forwardRef } from 'react';
import Container from '../shared/Container';
// import VideoModal from '../modal/VideoModal';

// const info = {
//   src: 'https://www.youtube.com/embed/AuBmikjCgjI',
//   title: 'How To Play'
// }

const Intro = forwardRef((props, ref) => {

  return (
    <Container className='intro'>
      <div ref={ref} className='intro-text slide-in'>
        <span className='smd--def'>An online implementation of the social deduction game<br/>Deception: Murder in Hong Kong</span>
      </div>
      {/* <VideoModal
        className='rules header'
        btnClassName='gradient larger'
        buttonContent='how to play'
        info={info}
      /> */}
    </Container>
  );
});

export default Intro;
