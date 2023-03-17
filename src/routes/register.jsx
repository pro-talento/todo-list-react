import AuthForm from '../components/AuthForm';

function register(props) {
  return (
    <AuthForm 
      onSubmit={(token) => props.onRegister(token)} 
      isSignUp
    />
  )
}

export default register;