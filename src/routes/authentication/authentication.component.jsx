import LoginForm from '../../components/login-form/login-form.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import { AuthenticationContainer } from './authentication.styles';

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <LoginForm />
      <SignUpForm />
    </AuthenticationContainer>
  );
};

export default Authentication;
