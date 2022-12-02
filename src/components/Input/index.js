import { createRef, useState } from 'react';
import { cssTransform } from 'utils.js'
import styles from './index.module.scss'

// props: title icon required type placeholder value min max pattern showError onEnter() onChange()
export default function Input(props) {
  const [isInvalid, setIsInvalid] = useState(false);

  const inputRef = createRef();
  const id = props?.title?.toLowerCase();
  const inputClassName = ['Input', props.icon && `icon-${props.icon}`, props.icon && 'icon', isInvalid && 'is-invalid'];
  const labelClassName = ['label'];
  const errorClassName = ['error-description', isInvalid && 'is-invalid'];

  const onChangeValue = (event) => {
    props.onChange(event);
    setIsInvalid(props.required === !event.target.value || inputRef.current.validationMessage);
  }

  const onKeyDownFunction = (event) => {
    if (event.key === 'Enter') {
      props.onEnter();
    }
  }

  return (
    <>
      {id && <label htmlFor={id} className={cssTransform(labelClassName, styles)}>{props.title}</label>}
      <input
        ref={inputRef}
        id={id}
        name={id}
        type={props.type}
        className={cssTransform(inputClassName, styles)}
        placeholder={props.placeholder}
        onChange={onChangeValue}
        onKeyDown={onKeyDownFunction}
        value={props.value}
        minLength={props.min}
        maxLength={props.max}
        required={props.required}
        pattern={props.pattern}
      ></input>
      {props.showError && <span
        className={cssTransform(errorClassName, styles)}
      >Not a valid {id}</span>}
    </>
  );
}