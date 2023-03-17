import { useState } from 'react';
import api from '../utils/api';

function AuthForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [signup, setSignup] = useState(props.isSignUp);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const handleLogin = () => {
    if (!email) {
      return setError({ message: 'Ingresa tu email 📧'});
    }
    if (!password) {
      return setError({ message: 'Ingresa tu password 🗝️'});
    }
    setLoading(true);
    api.loginUser(({ data: user, error }) => {
      setTimeout(() => {
        if (error) {
          setError({ message: 'Inicio de sesión incorrecto 🚨'});
        } else { 
          localStorage.setItem('token', user.id);
          props.onSubmit(user.id);
        }
        setLoading(false);
      }, 3000)
    }, { email, password })
  }

  const handleSignUp = () => {
    if (!email) {
      return setError({ message: 'Ingresa tu email 📧'});
    }
    if (!password) {
      return setError({ message: 'Ingresa tu password 🗝️'});
    }
    if (!confirmPassword) {
      return setError({ message: 'Por favor confirma tu password 🗝️'});
    }
    if (!name) {
      return setError({ message: 'Por favor dame tu nombre 🌎'});
    }
    if (confirmPassword !== password) {
      return setError({ message: 'Las contraseñas no coinciden 🗝️!==🔑'});
    }
    setLoading(true);
    api.createUser(({ data: user, error }) => {
      setTimeout(() => {
        if (error) {
          setError({ message: 'Inicio de sesión incorrecto 🚨'});
        } else { 
          localStorage.setItem('token', user.id);
          props.onSubmit(user.id);
        }
        setLoading(false);
      }, 3000)
    }, { email, password, name })
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (signup) {
      handleSignUp()
    } else {
      handleLogin()
    }
  }

  const textButton = signup ? 'Registrate' : 'Inicia Sesión';

  return (
    <div className="container-fluid mt-5">
      <div className="container login">
        <section className="card mb-5">
          <div className="card-body">
            <h1>{signup ? 'Crea tu cuenta 🚀' : 'Inicio de Sesión'}</h1>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Correo Electrónico</label>
                <input 
                  name="email" 
                  type="email" 
                  className="form-control" 
                  id="exampleInputEmail1" 
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div id="emailHelp" className="form-text">Por favor ingresa tu correo 😁</div>
              </div>
              {signup && (
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nombre de usuario</label>
                  <input 
                    name="name" 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    aria-describedby="nameHelp"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div id="nameHelp" className="form-text">Por favor dame tu nombre... 😁</div>
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input  
                  name="password" 
                  type="password" 
                  className="form-control" 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}  
                />
              </div>
              {signup && (
                <div className="mb-3">
                  <label htmlFor="password-confirm" className="form-label">Confirma tu constraseña</label>
                  <input  
                    name="password-confirm" 
                    type="password" 
                    className="form-control" 
                    id="password-confirm" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}  
                  />
                </div>
              )}
              {/* <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">Mantener sesión iniciada</label>
              </div> */}
              {error && <div className="alert alert-danger" role="alert">{error.message}</div>}
              <button 
                type="submit" 
                className="btn btn-primary btn-lg w-100"
                disabled={loading}
              >{loading ? '⏱️' : textButton}</button>
            </form>    
          </div>
        </section>
      </div>
    </div>
  )
}

export default AuthForm;