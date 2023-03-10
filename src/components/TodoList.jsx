import Todo from './Todo';

function TodoList(props) {
  return (
    <section className="card">
      <ul className="list-group list-group-flush" id="task-list">
        {props.todos.map(todo => (
          <Todo 
            key={todo.id}
            completed={todo.completed} 
            onToggle={() => props.onToggleTodo(todo.id, !todo.completed)}
            onDelete={() => props.onDeleteTodo(todo.id)}
            onUpdate={(newTodo) => props.onUpdateTodo(todo.id, newTodo)}
          >
            {todo.title}
          </Todo>
        ))}
      </ul>
    </section>
  )
}

export default TodoList;