import { cssTransform } from 'utils.js'
import styles from './index.module.scss'

// props: disabled icon isInvalid showError text onClick()
export default function Button(props) {
  const buttonClassName = ['Button', props.disabled && 'is-disabled', props.icon && 'icon', props.icon && `icon-${props.icon}`];
  const errorClassName = ['error-description', props.isInvalid && 'is-invalid'];

  const onClickFunction = (event) => {
    props.onClick();
  }

  return (
    <>
      <button
        className={cssTransform(buttonClassName, styles)}
        onClick={onClickFunction}
      >
        {props.text}
      </button>
      {props.showError &&
      <span className={cssTransform(errorClassName, styles)}>
        The server could not be reached. Please try again later.
      </span>
      }
    </>
  );
}