import React from 'react';
import Container from './Container';
import InfoModal from './InfoModal';
import { rules } from '../../util/utils';
import '../../styles/footer.scss';

const Footer = () => {

  return (
    <Container className="foot">
      <div className='footer-wrap'>
        <InfoModal
          className='rules footer'
          buttonContent='rules'
          info={rules}
        />
        <div className='footer-text'>
          Copyright 2021 Zilifant
        </div>
      </div>
      <div className='margin-hack'></div>
    </Container>
  );
};

export default Footer;