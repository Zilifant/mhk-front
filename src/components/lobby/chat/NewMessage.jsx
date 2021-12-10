import React from 'react';
import {
  validate,
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_BANNED_CHARS
} from '../../../util/validators';

const NewMessage = ({
  myLobby, onChange, messageText, submitHandler
}) => {

  const isValid = validate(messageText,
    [
      VALIDATOR_REQUIRE(),
      VALIDATOR_MAXLENGTH(280),
      VALIDATOR_BANNED_CHARS(['^','_','<','>'])
    ]
  );

  const hasBannedValue = validate(messageText,
    [
      VALIDATOR_MAXLENGTH(280),
      VALIDATOR_BANNED_CHARS(['^','_','<','>'])
    ]
  );

  const inputStyle = () => {
    const base = 'input new-message-input';
    const valid = isValid ? 'valid' : 'invalid';
    const banned = hasBannedValue ? 'notbanned' : 'banned';
    return `${base} ${valid} ${banned}`;
  };

  return (
    <React.Fragment>
      {myLobby &&
        <div className='new-message-wrapper'>
          <form className='form new-message-form'>
            <input
              className={inputStyle()}
              placeholder='Message'
              onChange={onChange}
              value={messageText}
            ></input>
            <button
              disabled={!isValid}
              onClick={submitHandler}
              className='btn--new-message'
            >
              Send
            </button>
          </form>
        </div>
      }
    </React.Fragment>
  );
};

export default NewMessage;
