import React, {
  // useState
} from 'react';
import Container from '../shared/Container';
import InfoModal from '../shared/InfoModal';
import { rules } from '../../util/utils';

const Header = () => {
  return (
    <Container className='head'>
      <div className='landing-title'>MHK</div>
      <InfoModal
        className='rules'
        buttonContent='how to play'
        info={rules}
      />
    </Container>
  );
};

export default Header;
