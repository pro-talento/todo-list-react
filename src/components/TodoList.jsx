import Todo from './Todo';

function TodoList(props) {
  return (
    <section className="card">
      <ul className="list-group list-group-flush" id="task-list">
        <Todo>Aprender React</Todo>
        <Todo>Aprender Next.js</Todo>
      </ul>
    </section>
  )
}

export default TodoList;