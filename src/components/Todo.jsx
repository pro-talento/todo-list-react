function Todo(props) {
  const { children } = props;
  console.log({ props })
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-8" onClick={() => console.log('Click en todo ...')}>
          <input
            // className="form-control ${completed ? 'task-done' : ''}" 
            value={children}
            disabled
          />
        </div>
        <div className="col-2">
          <button 
            className="btn btn-warning" 
            onClick={() => console.log('Editar todo ...')}
          >
            Editar
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