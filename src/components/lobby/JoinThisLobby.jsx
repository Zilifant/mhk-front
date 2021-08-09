import React, { useContext } from 'react';
import { useForm } from '../../hooks/form-hook';
import { useHttpClient } from '../../hooks/http-hook';
import { VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH } from '../../util/validators';
import Input from '../ui-elements/Input';
import ErrorModal from '../modal/ErrorModal';
import Button from '../ui-elements/Button';
import { UserContext } from '../../context/contexts';
import Loading from '../shared/Loading';
import Grid from '../shared/Grid';
import Container from '../shared/Container';

const JoinThisLobby = ({ lobbyId }) => {
  // console.log('JoinThisLobby');
  const { updateUserCtx } = useContext(UserContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    { userName: { value: '', isValid: false } }, false
  );

  const JoinThisLobbySubHandler = async event => {
    // console.log('JoinThisLobbySubHandler');
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/user/new`,
        'POST',
        JSON.stringify({
          userName: formState.inputs.userName.value,
          lobbyURL: lobbyId
        }),
        { 'Content-Type': 'application/json' },
      );
      updateUserCtx({
        userId: responseData.user.id,
        userName: responseData.user.userName,
        myLobby: responseData.user.myLobby
      });
    } catch (err) { console.log(err); };
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Container className='foyerjoin'>
      {isLoading && <Loading asOverlay color='green' />}
      <form className="form join-this-lobby-form" onSubmit={JoinThisLobbySubHandler}>
        <Grid className='join-this-lobby-form'>
          <div className='join-this-lobby-title'>JOIN THIS LOBBY</div>
          <div className='join-this-lobby-subtitle'>{lobbyId === 'z' ? 'Splendid-Monolith-8923' : lobbyId}</div>
          <Input
            id="userName"
            element="input"
            type="text"
            label="Your Name"
            placeholder="Name"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(10)]}
            errorText="Please enter a name."
            onInput={inputHandler}
            noInvalidStyle={true}
            className="join-this-lobby"
          />
          <Button type="submit" disabled={!formState.isValid} className='join-this-lobby'>
            SUBMIT
          </Button>
        </Grid>
      </form>
      </Container>
    </React.Fragment>
  );
};

export default JoinThisLobby;