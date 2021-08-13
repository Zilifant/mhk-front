import React from 'react';
import Button from '../../ui-elements/Button';
import {
  validate,
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH
} from '../../../util/validators';

const NewMessage = ({
  myLobby, onChange, messageText, submitHandler
}) => {

  return (
    <React.Fragment>
      {myLobby &&
        <div className='new-message-wrapper'>
          <form className='form new-message-form'>
            <input
              className='input new-message-input'
              placeholder='Message'
              onChange={onChange}
              value={messageText}
            ></input>
            <Button
              disabled={!validate(messageText,
                [VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(280)]
              )}
              onClick={submitHandler}
            >
              Send
            </Button>
          </form>
        </div>
      }
    </React.Fragment>
  );
};

export default NewMessage;
