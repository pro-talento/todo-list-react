import { useState, useEffect } from 'react';
import api from '../utils/api';

import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";


function todos(props) {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    if (props.token) {
      fetchTodos()
    }
  }, [props.token])

  const fetchTodos = () => {
    api.fetchTodoList((todos) => setTodos(todos.list), props.token)
  }

  const deleteTodo = (todoId) => {
    api.deleteTodoAPI(() => {
      fetchTodos()
    }, { todoId })
  }

  const updateTodo = (todoId, newText) => {
    api.editTodo((data) => {
      console.log('Tarea actualizada', data);
      fetchTodos()
    }, { todoId, newText})
  }

  const toggleTodo = (todoId, newCompleted) => {
    api.toggleTodoAPI(() => {
      fetchTodos()
    }, { todoId, newCompleted})
  }
  
  return (
    <>
      <TodoInput token={props.token} onCreateTodo={() => {
          fetchTodos()
          console.log('Se actualiza la lista')
          //...
        }} />
      <TodoList 
        todos={todos} 
        onDeleteTodo={deleteTodo} 
        onUpdateTodo={updateTodo} 
        onToggleTodo={toggleTodo}
      />
    </>
  )
}

export default todos;