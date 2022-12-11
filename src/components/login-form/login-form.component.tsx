import { ChangeEvent, FormEvent, useState } from 'react';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import { ButtonsContainer, LoginContainer } from './login-form.styles';
import { useDispatch } from 'react-redux';
import { emailSignInStart, googleSignInStart } from '../../store/user/user.action';

const defaultFormFields = {
  email: '',
  password: ''
};

const LoginForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch();

  const resetForm = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = () => {
    dispatch(googleSignInStart());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetForm();
    } catch (error) {
      console.log('User sign in failed', error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <LoginContainer>
      <h2>Already have an account?</h2>
      <span>Login with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label={'Email'}
          type="text"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label={'Password'}
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <ButtonsContainer>
          <Button type="submit">Login</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>
            Login with Google
          </Button>
        </ButtonsContainer>
      </form>
    </LoginContainer>
  );
};

export default LoginForm;
