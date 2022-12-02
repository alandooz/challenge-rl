import { useState, useEffect } from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import styles from './index.module.scss'

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formIsDisabled, setFormIsDisabled] = useState(true);
  const [serverError, setServerError] = useState(false);

  const localStorageName = "challengelr";
  const urlToLogin = "http://dev.rapptrlabs.com/Tests/scripts/user-login.php";
  const emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  const passwordPattern = "^([^\\s]){4,16}$";

  const changeValue = (valueOnChange, functionOnChange) => {
    functionOnChange(valueOnChange)
  }

  const submitForm = () => {
    if (!formIsDisabled) {
      setServerError(false);
      setFormIsDisabled(true);

      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);

      fetch(urlToLogin, {
        method: 'POST',
        body: formdata,
      })
      .then(response => response.json())
      .then(result => {
        if (result.user_token) {
          localStorage.setItem(localStorageName, JSON.stringify([]));
          props.updateLogged(true);
        } else {
          setServerError(true);
        }
        setFormIsDisabled(false);
      })
      .catch(error => {
        console.log('error', error)
        setServerError(true);
        setFormIsDisabled(false);
      });
    }
  }

  useEffect(() => {
    setFormIsDisabled(
      !new RegExp(emailPattern).test(email) ||
      !new RegExp(passwordPattern).test(password)
    );
  }, [email, password])

  return (
    <div className={styles['Login']}>
      <h1>
        Rapptr Labs
      </h1>
      <Input
        title="Email"
        type="email"
        placeholder="user@rapptrlabs.com"
        value={email}
        onChange={e => changeValue(e.target.value, setEmail)}
        onEnter={submitForm}
        icon="account"
        max={50}
        required
        pattern={emailPattern}
        showError
        />
      <Input
        title="Password"
        type="password"
        placeholder="Must be at least 4 characters"
        value={password}
        onChange={e => changeValue(e.target.value, setPassword)}
        onEnter={submitForm}
        icon="lock"
        min={4}
        max={16}
        required
        pattern={passwordPattern}
        showError
      />
      <Button
        text="Login"
        disabled={formIsDisabled}
        onClick={submitForm}
        isInvalid={serverError}
        showError
      />
    </div>
  );
}