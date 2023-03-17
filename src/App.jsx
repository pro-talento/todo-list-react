import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router';

import Root from './routes/root';
import Todos from './routes/todos';
import Login from './routes/login';
import Register from './routes/register';

function App() {
  let navigate = useNavigate()
  let location = useLocation()
  const [token, setToken] = useState(localStorage.getItem('token'));

  console.log(location)

  useEffect(() => {
    if (location.pathname !== '/register') {
      if (token) {
        navigate('todos')
      } else {
        navigate('login')
      }
    }
  }, [token])

  const onLoginHandler = (token) => {
    localStorage.setItem('token', token)
    setToken(token)
  }

  const onRegisterHandler = (token) => {
    localStorage.setItem('token', token)
    setToken(token)
    navigate('todos')
  }

  const onLogoutHandler = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <Routes>
      <Route path="/" element={<Root onLogout={onLogoutHandler} token={token} />}>
        <Route path="todos" element={<Todos token={token} />} />
        <Route path="login" element={<Login onLogin={onLoginHandler} />} />
        <Route path="register" element={<Register onRegister={onRegisterHandler} />} />
      </Route>
    </Routes>
  )
}

export default App
