function Todo(props) {
  render(
    <li class="list-group-item" id=${id}>
      <div class="row">
        <div class="col-8" onclick="toggleTask('${id}', ${completed})">
          <input
            id=${`${id}-input`}
            class="form-control ${completed ? 'task-done' : ''}" 
            value="${title}"
            disabled
          />
        </div>
        <div class="col-2">
          <button class="btn btn-warning" onclick="editTask('${id}')">Editar</button>
        </div>
        <div class="col-2">
          <button class="btn btn-danger" id="${id}-delete" onclick="deleteTask('${id}')">X</button>
        </div>
      </div>
    </li>
  )
}

export default Todo;