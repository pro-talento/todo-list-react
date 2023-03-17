import { useState } from 'react';
import api from '../utils/api';

function AuthForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
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

  return (
    <div className="container-fluid mt-5">
      <div className="container login">
        <section className="card mb-5">
          <div className="card-body">
            <h1>Inicio de Sesión</h1>
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
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                <input  
                  name="password" 
                  type="password" 
                  className="form-control" 
                  id="exampleInputPassword1" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}  
                />
              </div>
              {/* <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">Mantener sesión iniciada</label>
              </div> */}
              {error && <div class="alert alert-danger" role="alert">{error.message}</div>}
              <button 
                type="submit" 
                className="btn btn-primary btn-lg w-100"
                disabled={loading}
              >{loading ? '⏱️' : 'Submit'}</button>
            </form>    
          </div>
        </section>
      </div>
    </div>
  )
}

export default AuthForm;