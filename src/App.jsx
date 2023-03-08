import { useState } from 'react';

import AuthForm from "./components/AuthForm";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {

  const [session, setSession] = useState(null)

  return (
    <div className="container-fluid mt-5" id="todos-app">
      <div className="container tasks">
        {!session && <AuthForm onSubmit={() => setSession(true)} />}
        {session && (
          <>
            <TodoInput />
            <TodoList />
          </>
        )}
      </div>
    </div>
  )
}

export default App
