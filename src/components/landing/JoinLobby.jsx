import React, {
  useContext,
  useState
} from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from '../../hooks/form-hook';
import { useHttpClient } from '../../hooks/http-hook';
import { UserContext } from '../../context/contexts';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_LETTERS_ONLY
} from '../../util/validators';
import { MAX_NAME_LEN, randomName } from '../../util/utils';
import ErrorModal from '../modal/ErrorModal';
import Grid from '../shared/Grid';
import Container from '../shared/Container';
import Input from '../ui-elements/Input';
import Tooltip from '../shared/Tooltip';
import Button from '../ui-elements/Button';
// import SVGButton from '../ui-elements/SVGButton';
import '../../styles/info.scss';
import '../../styles/svgs.scss';

const JoinLobby = ({ lobbyId }) => {
  const { updateUserCtx } = useContext(UserContext);
  const history = useHistory();
  const { error, sendRequest, clearError } = useHttpClient();
  const [isStreamer, setIsStreamer] = useState(false);

  function joinLobbyData(dev) {
    const prodData = {
      userName: formState.inputs.userName.value,
      lobbyURL: lobbyId || formState.inputs.lobbyURL.value,
      isStreamer
    };
    const devData = {
      userName: randomName(),
      lobbyURL: 'z',
      isStreamer
    };
    return JSON.stringify(dev ? devData : prodData); 
  }

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

  const joinLobbySubHandler = async (event, dev) => {
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
        myLobby: responseData.user.myLobby,
        isStreamer: responseData.user.isStreamer
      });
      history.push('/lobby'); // forward user to route of lobby
    } catch (err) { console.log(err); };
  };

  // const [lobbyIdHidden, setLobbyIdHidden] = useState(true);

  // const hideLobbyIdHandler = () => setLobbyIdHidden(!lobbyIdHidden);

  // let lid;
  // if (lobbyId) lid = lobbyId === 'z' ? 'SPLENDID-MONOLITH-8923' : lobbyId.toUpperCase()

  // const HiddenURL = () => (
  //   <div className='lobbyid-wrap'>
  //     <div className='ttip-parent'>
  //       <SVGButton
  //         className='hidelobbyid'
  //         icon={lobbyIdHidden ? 'show' : 'hide'}
  //         onClick={hideLobbyIdHandler}
  //         disabled={false}
  //       />
  //       <Tooltip tip='hideShowName' side='left' />
  //     </div>
  //     <div className={`info-lobbyid ${lobbyIdHidden ? 'obscured' : 'visible'}`}>
  //       {lobbyIdHidden ? 'lobby name hidden' : lid}
  //     </div>
  //   </div>
  // )

  if (lobbyId) return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Container className='foyerjoin'>
        <div className='landing-forms-wrapper'>
          {/* <HiddenURL /> */}
          <form className="form join-this-lobby-form" onSubmit={joinLobbySubHandler}>
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
              <button type="submit" disabled={!formState.isValid} className='join-this-lobby-btn'>
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
                disabled={false}
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

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Container className='joinlobby'>
        <div className='landing-forms-wrapper'>
          <form className='form join-lobby-form' onSubmit={joinLobbySubHandler}>
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
              <button type='submit' disabled={!formState.isValid} className='join-lobby-btn'>
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
                disabled={false}
                className={`streaming-mode-btn ${isStreamer && 'on'}`}
                onClick={() => setIsStreamer(!isStreamer)}
              />
              <Tooltip tip='streamingMode' side='bottom' />
            </div>
          </div>
        </div>
      </Container>
      <Button
        disabled={false}
        className='join-devlobby'
        onClick={(e) => joinLobbySubHandler(e, true)}
      >
        DEV
      </Button>
    </React.Fragment>
  );
};

export default JoinLobby;
