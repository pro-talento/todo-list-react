import { useState, useEffect } from "react";

function Todo(props) {
  const [todo, setTodo] = useState(props.children);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!editing && todo !== props.children) {
      props.onUpdate(todo)
    }
  }, [editing])

  const handleEditingToggle = () => {
    setEditing(!editing)
  }

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-8" onClick={() => console.log('Click en todo ...')}>
          <input
            // className="form-control ${completed ? 'task-done' : ''}" 
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            disabled={!editing}
          />
        </div>
        <div className="col-2">
          <button 
            className="btn btn-warning" 
            onClick={handleEditingToggle}
          >
          ✏️
          </button>
        </div>
        <div className="col-2">
          <button 
            className="btn btn-danger" 
            onClick={props.onDelete}
          >
            X
          </button>
        </div>
      </div>
    </li>
  )
}

export default Todo;