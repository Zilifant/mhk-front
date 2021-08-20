import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from '../../hooks/form-hook';
import { UserContext } from '../../context/contexts';
import { useHttpClient } from '../../hooks/http-hook';
import { VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH } from '../../util/validators';
import { MAX_NAME_LEN, randomName } from '../../util/utils';
import ErrorModal from '../modal/ErrorModal';
// import Loading from '../shared/Loading';
import Grid from '../shared/Grid';
import Container from '../shared/Container';
import Input from '../ui-elements/Input';
import Button from '../ui-elements/Button';

const JoinLobby = () => {
  // console.log('JoinLobby');
  const { updateUserCtx } = useContext(UserContext);
  const { error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      userName: { value: '', isValid: false },
      lobbyURL: { value: '', isValid: false }
    }, false
  );

  function joinLobbyData(dev) {
    const prodData = {
      userName: formState.inputs.userName.value,
      lobbyURL: formState.inputs.lobbyURL.value
    };
    const devData = {
      userName: randomName(),
      lobbyURL: 'z'
    };
    return JSON.stringify(dev ? devData : prodData); 
  }

  const history = useHistory();

  const joinLobbySubHandler = async (event, dev) => {
    // console.log('joinLobbySubHandler');
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/user/new`,
        'POST',
        joinLobbyData(dev),
        { 'Content-Type': 'application/json' },
      );
      updateUserCtx({
        userId: responseData.user.id,
        userName: responseData.user.userName,
        myLobby: responseData.user.myLobby
      });
      // 'forward' user to route of lobby
      history.push('/lobby');
    } catch (err) { console.log(err); };
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Container className='joinlobby'>
        {/* {isLoading && <Loading asOverlay color='blue' />} */}
        <form className='form join-lobby-form' onSubmit={joinLobbySubHandler}>
          <Grid className='join-lobby-form'>
            <div className='join-lobby-title'>JOIN LOBBY</div>
            <Input
              id='userName'
              element='input'
              type='text'
              label='Your Name'
              placeholder='Name'
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(MAX_NAME_LEN)]}
              errorText='Please enter a name.'
              onInput={inputHandler}
              noInvalidStyle={true}
              className='join-lobby-username'
            />
            <Input
              id='lobbyURL'
              element='input'
              type='text'
              label='Lobby Name'
              placeholder='mellow-earth-4321'
              initialValue=''
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Please enter a valid lobby ID.'
              onInput={inputHandler}
              noInvalidStyle={true}
              className='join-lobby-lobbyid'
            />
            <Button type='submit' disabled={!formState.isValid} className='join-lobby'>
              SUBMIT
            </Button>
          </Grid>
        </form>
        <Button
          disabled={false}
          className='join-devlobby'
          onClick={(e) => joinLobbySubHandler(e, true)}
        >
          DEV
        </Button>
      </Container>
    </React.Fragment>
  );
};

export default JoinLobby;
