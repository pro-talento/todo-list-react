import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';

import Root from './routes/root';
import Todos from './routes/todos';
import Login from './routes/login';

function App() {
  let navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      navigate('todos')
    } else {
      navigate('login')
    }
  }, [token])

  const onLoginHandler = (token) => {
    localStorage.setItem('token', token)
    setToken(token)
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
      </Route>
    </Routes>
  )
}

export default App
