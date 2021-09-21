import React, {
  useContext,
  useState
} from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from '../../hooks/form-hook';
import { useHttpClient } from '../../hooks/http-hook';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_LETTERS_ONLY
} from '../../util/validators';
import { MAX_NAME_LEN } from '../../util/utils';
import { UserContext } from '../../context/contexts';
import Input from '../ui-elements/Input';
// import Button from '../ui-elements/Button';
import Container from '../shared/Container';
import ErrorModal from '../modal/ErrorModal';
import Tooltip from '../shared/Tooltip';
import Grid from '../shared/Grid';

const NewLobby = () => {
  const { updateUserCtx } = useContext(UserContext);
  const { error, sendRequest, clearError } = useHttpClient('NewLobby');
  const [isStreamer, setIsStreamer] = useState(false);

  const [formState, inputHandler] = useForm(
    {
      userName: { value: '', isValid: false }
    }, false
  );

  const history = useHistory();

  const newLobbySubmitHandler = async event => {
    event.preventDefault();

    try {
      // TO DO: use FormData instead of JSON?
      // const formData = new FormData();
      // formData.append('userName', formState.inputs.userName.value);
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
        isLeader: true,
        isStreamer: responseData.user.isStreamer,
        leaderOf: responseData.user.myLobby
      });
      history.push('/lobby'); // forward user to route of lobby
    } catch (err) { console.log(err); }
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Container className='newlobby'>
        <div className='landing-forms-wrapper'>
          <form className='form new-lobby-form' onSubmit={newLobbySubmitHandler}>
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
                SUBMIT
              </button>
            </Grid>
          </form>
          <div className='streaming-mode-wrapper'>
            <span className='streaming-mode-label'>
              streaming mode
            </span>
            <div className='streaming-mode ttip-parent'>
              <button
                className={`streaming-mode-btn ${isStreamer && 'on'}`}
                onClick={() => setIsStreamer(!isStreamer)}
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
