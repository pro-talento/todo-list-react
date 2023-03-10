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

function deleteTodoAPI(callback, { todoId }) {
  console.log('task to delete ', todoId)
  fetch(`${API_URL}/tasks/${todoId}`, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .then(data => {
    console.log('Se borro la tarea ', data)
    callback(data)
  })
}

function editTodo(callback, data) {
    fetch(`${API_URL}/tasks/${data.todoId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: data.newText
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then(data => {
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

  const deleteTodo = (todoId) => {
    deleteTodoAPI(() => {
      fetchTodos()
    }, { todoId })
  }

  const updateTodo = (todoId, newText) => {
    editTodo((data) => {
      console.log('Tarea actualizada', data);
      fetchTodos()
    }, { todoId, newText})
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
            <TodoList 
              todos={todos} 
              onDeleteTodo={deleteTodo} 
              onUpdateTodo={updateTodo} 
            />
          </>
        )}
      </div>
    </div>
  )
}

export default App
