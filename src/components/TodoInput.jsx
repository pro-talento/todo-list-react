import { useState } from 'react';

const API_URL = 'http://localhost:8008';

function createTodo(callback, data) {
  fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': data.token
    },
    body: JSON.stringify({ title: data.todo })
  })
  .then(res => {
    if (!res.ok) {
      res.json()
        .then((data) => {
          console.error(data.message)
        })
      return;
    }
    return res.json()
  })
  .then((data) => {
    callback(data)
  })
  .catch(error => {
    console.error(error)
  })
}

function TodoInput(props) {
  const [todo, setTodo] = useState('')

  const handleCreateTodo = () => {
    createTodo((data) => {
      console.log('Todo creado: ', data)
      props.onCreateTodo()
      setTodo('')
    }, { todo, token: props.token })
  }

  return (
    <section className="card mb-5">
      <div className="card-body">
        <div className="mb-3">
          <label htmlFor="task" className="form-label">Ingresar Todo</label>
          <input 
            onChange={(event) => setTodo(event.target.value)}
            value={todo}
            type="text" 
            className="form-control" 
            placeholder="Ir por unos tacos..."
            id="task-input"
          />
          <p id="task-input-message"></p>
        </div>
        <div>
          <button 
            onClick={handleCreateTodo}
            type="button"
            className="btn btn-success"
            id="submit-task-button"
          >Crear Tarea</button>
        </div>
      </div>
    </section>
  )
}

export default TodoInput;