import React, {
  // useState,
  // useContext,
  // useEffect
} from 'react';
import { useHttpClient } from './hooks/http-hook';
import Container from './Container';
import Button from '../ui-elements/Button';

const Footer = ({  }) => {
  const { sendRequest } = useHttpClient();

  const getDataHandler = async event => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/admin/data`
      );
      console.log(responseData);
    } catch (err) { console.log(`Err: ${err}`); };
  };

  return (
    <Container className="foot">
      <Button
        type='button'
        onClick={getDataHandler}
      >
        data
      </Button>
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
