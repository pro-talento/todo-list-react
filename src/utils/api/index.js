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

function toggleTodoAPI(callback, data) {
  fetch(`${API_URL}/tasks/${data.todoId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      completed: data.newCompleted
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

function loginUser(callback, data) {
  fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    })
  })
  .then(res => res.json())
  .then(user => {
    let session = user.id;
    callback(session)
  })
}

export default {
  loginUser,
  fetchTodoList,
  deleteTodoAPI,
  editTodo,
  toggleTodoAPI
}