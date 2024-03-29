// New Lobby / Join Lobby

import { useContext, useState, forwardRef } from 'react';
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
import Input from '../shared/Input';
import Tooltip from '../shared/Tooltip';
import Toggle from '../shared/Toggle';

const formTypes = [
  {
    id: 'joinThis',
    pathFragment: 'user',
    title: 'join this lobby',
    btnText: 'join',
    cssClass: 'join-this-lobby',
    hasLobbyIdInput: false,
  },
  {
    id: 'joinLobby',
    pathFragment: 'user',
    title: 'join lobby',
    btnText: 'join',
    cssClass: 'join-lobby',
    hasLobbyIdInput: true,
  },
  {
    id: 'newLobby',
    pathFragment: 'lobby',
    title: 'new lobby',
    btnText: 'start',
    cssClass: 'new-lobby',
    hasLobbyIdInput: false,
  },
];

const LobbyForm = forwardRef(({ formType, lobbyId = null, departHandler }, ref) => {
  const form = formTypes.find(type => type.id === formType);

  const { updateUserCtx } = useContext(UserContext);
  const { error, sendRequest, clearError } = useHttpClient('LobbyForm');

  const [isStreamer, setIsStreamer] = useState(false);

  const history = useHistory();

  function initFormState() {
    const initState = { userName: { value: '', isValid: false } };
    if (form.hasLobbyIdInput) initState.lobbyId = { value: '', isValid: false };
    return initState;
  };

  const [formState, inputHandler] = useForm(initFormState(), false);

  const enterLobbyHandler = async event => {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/${form.pathFragment}/new`,
        'POST',
        JSON.stringify({
          userName: formState.inputs.userName.value,
          lobbyId: lobbyId || formState?.inputs?.lobbyId?.value || null,
          isStreamer,
          isDemo: false,
        }),
        { 'Content-Type': 'application/json' },
      );

      updateUserCtx({
        userId: responseData.user.id,
        userName: responseData.user.userName,
        myLobby: responseData.user.myLobby,
        isStreamer: responseData.user.isStreamer,
        isDemo: responseData.user.isDemo,
      });

      // Forwarding visitor will render Foyer, which will then render the
      // lobby, since the user will have valid userContext data.
      history.push('/lobby');
      // departHandler();
    } catch (err) { console.log(err); }
  };

  return (<>

    <ErrorModal error={error} onClear={clearError} />

    <div ref={ref} className='lobby-form-wrapper slide-in'>

      <form
        className={`lobby-form`}
        onSubmit={enterLobbyHandler}
      >
        <div className={`lobby-form-grid grid--${form.cssClass}`}>

          <div className={`lobby-form-title`}>{form.title}</div>

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
            className={`lobby-form-input input-username`}
          />

          {form.hasLobbyIdInput && <><Input
            id='lobbyId'
            element='input'
            type='text'
            label='Lobby Name'
            placeholder='Dark-Tower-0000'
            initialValue=''
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid lobby ID.'
            onInput={inputHandler}
            noInvalidStyle={true}
            className={`lobby-form-input input-lobbyid`}
          /><div className='empty-cell'></div></>}

          <button
            type='submit'
            disabled={!formState.isValid}
            className={`lobby-form-btn`}
          >
            {form.btnText}
          </button>

        </div>
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

  </>);
});

export default LobbyForm;
