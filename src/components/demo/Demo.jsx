// Demo Page

import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/contexts';
import { useHttpClient } from '../../hooks/http-hook';
import Views from './Views';
import Container from '../shared/Container';
import '../../styles/demo.scss';

const Demo = () => {

  const { sendRequest, isLoading } = useHttpClient('Demo');
  const { updateUserCtx } = useContext(UserContext);

  const [demoLobbyId, setDemoLobbyId] = useState(null);

  useEffect(() => {

    const newDemoLobbyHandler = async () => {

      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/lobby/new`,
          'POST',
          JSON.stringify({
            userName: 'DEMO_USER',
            isStreamer: false,
            isDemo: true,
          }),
          { 'Content-Type': 'application/json' },
        );
        setDemoLobbyId(responseData.user.myLobby);
        updateUserCtx({
          userId: responseData.user.id,
          userName: responseData.user.userName,
          myLobby: responseData.user.myLobby,
          isStreamer: responseData.user.isStreamer,
          isDemo: responseData.user.isDemo,
        });

      } catch (err) { console.log(err); }
    };
    newDemoLobbyHandler();

  }, [sendRequest, setDemoLobbyId, updateUserCtx]);

  return (
    <Container>

      <Container className='demo-head'>
        Demo
      </Container>

      {!isLoading && demoLobbyId &&
        <Container className='demo-views'>
          <Views/>
        </Container>
      }

    </Container>
  );

};

export default Demo;
