import React, {
  // useState,
  // useContext,
  // useEffect
} from 'react';
import Container from './Container';
// import Button from '../ui-elements/Button';

const Footer = props => {
  console.log('Footer');

  return (
    <Container className="foot">
      {/* <Button onClick={() => console.log(props.socket)}>
        SOCKET
      </Button>
      <Button onClick={() => console.table(props.onlineMembers)}>
        ONLINE
      </Button> */}
    </Container>
  );
};

export default Footer;
