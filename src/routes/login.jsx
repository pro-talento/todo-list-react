import AuthForm from '../components/AuthForm';

function login(props) {
  return (
    <AuthForm onSubmit={(token) => props.onLogin(token)} />
  )
}

export default login;