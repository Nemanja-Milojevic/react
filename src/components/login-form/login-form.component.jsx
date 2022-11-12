import { useState } from 'react';

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';
import './login-form.styles.scss';

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

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password);
      console.log(response);
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
    <div className="login-container">
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

        <div className="buttons-container">
          <Button type="submit">Login</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType="google">
            Login with Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
