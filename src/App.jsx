import { useState } from 'react';

import AuthForm from "./components/AuthForm";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {

  const [token, setToken] = useState(null)

  return (
    <div className="container-fluid mt-5" id="todos-app">
      <div className="container tasks">
        {!token && <AuthForm onSubmit={(token) => setToken(token)} />}
        {token && (
          <>
            <TodoInput />
            <TodoList token={token} />
          </>
        )}
      </div>
    </div>
  )
}

export default App
