// Input //
// TO DO: re-implement error text...
// {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}

import React, { useReducer, useEffect } from 'react';
import { validate } from '../../util/validators';

const inputReducer = (state, action) => {

  switch (action.type) {
    case 'CHANGE':
      return {
        // Create copy of old state to save it to this new object, then modify
        // individual key/values.
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      }
    case 'TOUCH':
      return {
        ...state,
        isTouched: true
      }
    default:
      return state; // Return the unchanged state.
  };

};

const Input = (props) => {

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput]);

  // Send this object with data about the change to `useReducer`.
  const changeHandler = event => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators
    });

  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };

  // TO DO: Refactor this ternary.
  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        className={`input ${props.className}-input ${
          !props.noInvalidStyle &&
          !inputState.isValid &&
          inputState.isTouched &&
          'form--invalid'
        }`}
      />
    ) : (
      <textarea
        name='inputform'
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        className={`textarea ${props.className}-textarea ${
          !props.noInvalidStyle &&
          !inputState.isValid &&
          inputState.isTouched &&
          'form--invalid'
        }`}
      />
    );

  return (
    <React.Fragment>
      <label
        className={`label ${props.className}-label`}
        htmlFor={props.id}
      >
        {props.label}
      </label>
      {element}
    </React.Fragment>
  )
}

export default Input
