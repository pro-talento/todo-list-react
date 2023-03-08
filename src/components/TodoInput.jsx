function TodoInput(props) {

  return (
    <section className="card mb-5">
      <div className="card-body">
        <div className="mb-3">
          <label htmlFor="task" className="form-label">Ingresar Todo</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Ir por unos tacos..."
            id="task-input"
          />
          <p id="task-input-message"></p>
        </div>
        <div>
          <button 
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