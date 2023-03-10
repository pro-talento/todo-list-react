import { useState } from 'react';

import AuthForm from "./components/AuthForm";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {

  const [token, setToken] = useState('1c9f04c1-2f37-480d-9d1c-49ee47ba947f')

  return (
    <div className="container-fluid mt-5" id="todos-app">
      <div className="container tasks">
        {!token && <AuthForm onSubmit={(token) => setToken(token)} />}
        {token && (
          <>
            <TodoInput token={token} />
            <TodoList token={token} />
          </>
        )}
      </div>
    </div>
  )
}

export default App
