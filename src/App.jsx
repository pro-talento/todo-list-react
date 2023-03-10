import { useState, useEffect } from 'react';

import AuthForm from "./components/AuthForm";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";


const API_URL = 'http://localhost:8008';

function fetchTodoList(callback, token) { 
  fetch(`${API_URL}/tasks`, {
    method: 'GET',
    headers: {
      'Authorization': token
    }
  })
  .then((res) => res.json())
  .then((data) => {
    callback(data)
  })
}

function App() {

  const [token, setToken] = useState('1c9f04c1-2f37-480d-9d1c-49ee47ba947f')
  const [todos, setTodos] = useState([])

  useEffect(() => {
    if (token) {
      fetchTodos()
    }
  }, [token])

  const fetchTodos = () => {
    fetchTodoList((todos) => setTodos(todos.list), token)
  }

  return (
    <div className="container-fluid mt-5" id="todos-app">
      <div className="container tasks">
        {!token && <AuthForm onSubmit={(token) => setToken(token)} />}
        {token && (
          <>
            <TodoInput token={token} onCreateTodo={() => {
                fetchTodos()
                console.log('Se actualiza la lista')
                //...
              }} />
            <TodoList todos={todos} />
          </>
        )}
      </div>
    </div>
  )
}

export default App
