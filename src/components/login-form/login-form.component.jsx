import { useState } from 'react';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';
import { ButtonsContainer, LoginContainer } from './login-form.styles';

const defaultFormFields = {
  email: '',
  password: ''
};

const LoginForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetForm = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = () => {
    signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetForm();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect credentials');
          break;
        case 'user-not-found':
          alert('User not found');
          break;
        default:
          console.log('error', error.message);
          break;
      }
    }
  };

  const handleChange = (event) => {
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
