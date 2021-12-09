// NewLobby //
// Form to create (and then join) a new lobby. Shown on landing page.
// TO DO: Implement error text for invalid form states.

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

const NewLobby = () => {
  const { updateUserCtx } = useContext(UserContext);
  const { error, sendRequest, clearError } = useHttpClient('NewLobby');

  const [isStreamer, setIsStreamer] = useState(false);

  const history = useHistory();

  const [formState, inputHandler] = useForm(
    { userName: { value: '', isValid: false } },
    false
  );

  const newLobbyHandler = async event => {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/lobby/new`,
        'POST',
        JSON.stringify({
          userName: formState.inputs.userName.value,
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
      // Forwarding visitor will render Foyer, which will then render the
      // lobby, since the user will have valid userContext data.
      history.push('/lobby');
    } catch (err) { console.log(err); }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Container className='newlobby'>
        <div className='landing-forms-wrapper'>
          <form
            className='form new-lobby-form'
            onSubmit={newLobbyHandler}
          >
            <Grid className='new-lobby-form'>
              <div className='new-lobby-title'>START NEW LOBBY</div>
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
                className='new-lobby'
              />
              <button
                type='submit'
                disabled={!formState.isValid}
                className='new-lobby-btn'
              >
                start
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

export default NewLobby;
