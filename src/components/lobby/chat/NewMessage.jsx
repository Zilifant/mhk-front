// NewMessage //

import {
  validate,
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_BANNED_CHARS
} from '../../../util/validators';

const NewMessage = ({
  onChange,
  messageText,
  submitHandler
}) => {

  // Banned characters are used by the SMD module.
  // TO DO: Not ideal solution; refactor SMD module to sanitize user input.

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

  // Apply css classes to change input field style as user types.
  const inputStyle = () => {
    const valid = isValid ? 'valid' : 'invalid';
    const banned = hasBannedValue ? 'notbanned' : 'banned';
    return `input new-message-input ${valid} ${banned}`;
  };

  return (
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
  );
};

export default NewMessage;
