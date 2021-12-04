import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from '../../hooks/form-hook';
import { useHttpClient } from '../../hooks/http-hook';
import { UserContext } from '../../context/contexts';
import { MAX_NAME_LEN } from '../../util/utils';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_LETTERS_ONLY
} from '../../util/validators';
import ErrorModal from '../modal/ErrorModal';
import Grid from '../shared/Grid';
import Container from '../shared/Container';
import Input from '../ui-elements/Input';
import Tooltip from '../shared/Tooltip';
import Toggle from '../ui-elements/Toggle';

const JoinLobby = ({ lobbyId }) => {
  const { updateUserCtx } = useContext(UserContext);
  const { error, sendRequest, clearError } = useHttpClient('JoinLobby');
  const history = useHistory();
  const [isStreamer, setIsStreamer] = useState(false);

  const joinThisLobbyFormInitState = {
    userName: { value: '', isValid: false }
  };

  const joinLobbyFormInitState = {
    userName: { value: '', isValid: false },
    lobbyURL: { value: '', isValid: false }
  };

  const initFormState = !lobbyId
    ? joinLobbyFormInitState
    : joinThisLobbyFormInitState;

  const [formState, inputHandler] = useForm(initFormState, false);

  const joinLobbyHandler = async (event) => {
    event.preventDefault();

    // Temporary way for admin to recieve all lobby data from live server.
    function isAdminBackDoor() {
      const userName = formState.inputs.userName.value,
            lobbyURL = formState.inputs.lobbyURL.value,
            isAdminUser = userName === process.env.REACT_APP_ADMIN_USER,
            isAdminPass = lobbyURL === process.env.REACT_APP_ADMIN_PASS;
      return (isAdminUser && isAdminPass);
    };

    if (isAdminBackDoor()) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/admin/lobbies`
        );
        console.log(responseData.lobbies);
      } catch (err) { console.log(err); };
      return;
    };

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/user/new`,
        'POST',
        JSON.stringify({
          userName: formState.inputs.userName.value,
          lobbyURL: lobbyId || formState.inputs.lobbyURL.value,
          isStreamer
        }),
        { 'Content-Type': 'application/json' },
      );
      updateUserCtx({
        userId: responseData.user.id,
        userName: responseData.user.userName,
        myLobby: responseData.user.myLobby,
        isStreamer: responseData.user.isStreamer
      });
      history.push('/lobby'); // forward user to route of lobby
    } catch (err) { console.log(err); };
  };

  if (lobbyId) return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Container className='foyerjoin'>
        <div className='landing-forms-wrapper'>
          <form
            className="form join-this-lobby-form"
            onSubmit={joinLobbyHandler}
          >
            <Grid className='join-this-lobby-form'>
              <div className='join-this-lobby-title'>JOIN THIS LOBBY</div>
              <Input
                id="userName"
                element="input"
                type="text"
                label="Your Name"
                placeholder="Name"
                validators={[
                  VALIDATOR_REQUIRE(),
                  VALIDATOR_MAXLENGTH(MAX_NAME_LEN),
                  VALIDATOR_LETTERS_ONLY()
                ]}
                errorText="Please enter a name."
                onInput={inputHandler}
                noInvalidStyle={true}
                className="join-this-lobby"
              />
              <button
                type="submit"
                disabled={!formState.isValid}
                className='join-this-lobby-btn'
              >
                join
              </button>
            </Grid>
          </form>
          <div className='streaming-mode-wrapper'>
            <span className='streaming-mode-label'>
              streaming mode
            </span>
            <div className='streaming-mode ttip-parent'>
              <Toggle
                className='streaming-mode-btn'
                onChange={() => setIsStreamer(!isStreamer)}
              />
              <Tooltip tip='streamingMode' side='bottom' />
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Container className='joinlobby'>
        <div className='landing-forms-wrapper'>
          <form
            className='form join-lobby-form'
            onSubmit={joinLobbyHandler}
          >
            <Grid className='join-lobby-form'>
              <div className='join-lobby-title'>JOIN LOBBY</div>
              <Input
                id='userName'
                element='input'
                type='text'
                label='Your Name'
                placeholder='Name'
                validators={[
                  VALIDATOR_REQUIRE(),
                  VALIDATOR_MAXLENGTH(MAX_NAME_LEN),
                  VALIDATOR_LETTERS_ONLY()
                ]}
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
              <button
                type='submit'
                disabled={!formState.isValid}
                className='join-lobby-btn'
              >
                join
              </button>
            </Grid>
          </form>
          <div className='streaming-mode-wrapper'>
            <span className='streaming-mode-label'>
              streaming mode
            </span>
            <div className='streaming-mode ttip-parent'>
              <Toggle
                className='streaming-mode-btn'
                onChange={() => setIsStreamer(!isStreamer)}
              />
              <Tooltip tip='streamingMode' side='bottom' />
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default JoinLobby;