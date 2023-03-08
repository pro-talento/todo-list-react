import { useEffect, useState } from 'react';
import Todo from './Todo';

const API_URL = 'http://localhost:8008';

function fetchTaskList(callback, token) { 
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

function TodoList(props) {

  const [todos, setTodos] = useState([])

  useEffect(() => {
    if (props.token) {
      fetchTaskList((todos) => setTodos(todos.list), props.token)
    }
  }, [props.token])

  console.log({ todos })
  console.log({ props })
  return (
    <section className="card">
      <ul className="list-group list-group-flush" id="task-list">
        {todos.map(todo => <Todo key={todo.id}>{todo.title}</Todo>)}
      </ul>
    </section>
  )
}

export default TodoList;