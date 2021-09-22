import React from 'react';
import Container from './Container';
import InfoModal from './InfoModal';
import { rules } from '../../util/utils';
import '../../styles/footer.scss';

const Footer = () => {

  return (
    <Container className="foot">
      <InfoModal
        className='rules footer'
        buttonContent='rules'
        info={rules}
      />
      <div className='footer-text'>
        Copyright 2021 Scott Silsbe
      </div>
    </Container>
  );
};

export default Footer;