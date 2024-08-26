/* eslint-disable react/prop-types */
import { useReducer, useEffect } from "react";
import { validate } from "../../util/validators";
import "./Input.css";

function inputReducer(state, action) {
  if (action.type === "CHANGE") {
    return {
      ...state,
      value: action.value,
      isValid: validate(action.value, action.validators),
    };
  }

  if(action.type === 'TOUCH'){
    return {
      ...state,
      isTouched: true
    }
  }
  return state;
}

export default function Input({
  id,
  label,
  element,
  type,
  placeholder,
  rows,
  errorText,
  validators,
  onInput,
  initialValue,
  initialValid
}) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || '',
    istouched: false,
    isValid: initialValid || false,
  });

  const {value, isValid } = inputState

  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput])

  function handleChange(ev) {
    dispatch({ type: "CHANGE", value: ev.target.value, validators});
  }

  function handleTouch(){
    dispatch({
      type: 'TOUCH'
    })
  }

  const elementTag =
    element === "input" ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        value={inputState.value}
        onBlur={handleTouch}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={handleChange}
        value={inputState.value}
        onBlur={handleTouch}
      />
    );

  return (
    <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
      <label htmlFor={id}>{label}</label>
      {elementTag}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
}
