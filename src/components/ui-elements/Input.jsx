import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';
// import '../styles/Input.css';

// `useReducer` to manage more complex state; we pass it an action, it modifies the state depending on the action passed (the reducer function is how it modifies it) and then returns the state and re-renders stuff
// here defined outside the component because it does not depend on any component inputs
const inputReducer = (state, action) => {
  // console.log('inputReducer');
  // console.log(state);
  // console.log(action);
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state, // create copy of old state to save it to this new object; then we can modify individual key/values
        value: action.val,
        isValid: validate(action.val, action.validators)
      }
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true
      }
    }
    default:
      return state; // return the unchanged state
  }
};

const Input = props => {
  // can use array destructuring; like useState, this returns an array of two elements
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

  const changeHandler = event => {
    // console.log('changeHandler');
    // console.log(event.target.value);
    // send this object with data about the change to the userReducer
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators
    });
    // console.log(event.target.value);
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  }

  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler} // triggers for every keystroke
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
        name="inputform"
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

// htmlFor = `for` in standard html (like class\className)

// {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}