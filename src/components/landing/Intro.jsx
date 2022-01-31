// Landing Page Intro //

import Container from '../shared/Container';
// import VideoModal from '../modal/VideoModal';

// const info = {
//   src: 'https://www.youtube.com/embed/AuBmikjCgjI',
//   title: 'How To Play'
// }

const Intro = () => {

  return (
    <Container className='intro'>
      <div className='intro-text'>
        <span className='smd--def'>An online implementation of the social deduction game<br/>Deception: Murder in Hong Kong</span>
        <span className='smd--emphasize'></span>
      </div>
      {/* <VideoModal
        className='rules header'
        btnClassName='gradient larger'
        buttonContent='how to play'
        info={info}
      /> */}
    </Container>
  );
};

export default Intro;
