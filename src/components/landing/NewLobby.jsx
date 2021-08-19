import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from '../../hooks/form-hook';
import { useHttpClient } from '../../hooks/http-hook';
import { VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH } from '../../util/validators';
import { MAX_NAME_LEN } from '../../util/utils';
import { UserContext } from '../../context/contexts';
import Input from '../ui-elements/Input';
import Button from '../ui-elements/Button';
import Container from '../shared/Container';
import ErrorModal from '../modal/ErrorModal';
// import Loading from '../shared/Loading';
import Grid from '../shared/Grid';

const NewLobby = () => {
  // console.log('NewLobby');
  const { updateUserCtx } = useContext(UserContext);
  const { error, sendRequest, clearError } = useHttpClient();

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
        }),
        { 'Content-Type': 'application/json' },
      );
      updateUserCtx({
        userId: responseData.user.id,
        userName: responseData.user.userName,
        myLobby: responseData.user.myLobby,
        isLeader: true,
        leaderOf: responseData.user.myLobby
      });
      // 'forward' user to route of lobby
      history.push('/lobby');
    } catch (err) { console.log(err); }
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Container className='newlobby'>
        {/* {isLoading && <Loading asOverlay color='red' />} */}
        <form className='form new-lobby-form' onSubmit={newLobbySubmitHandler}>
          <Grid className='new-lobby-form'>
            <div className='new-lobby-title'>START NEW LOBBY</div>
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
              className='new-lobby'
            />
            <Button
              type='submit'
              disabled={!formState.isValid}
              className='new-lobby'
            >
              SUBMIT
            </Button>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
};

export default NewLobby;
