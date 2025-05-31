import React, { useState } from 'react';

function TodoList({ todos, updateTodo, deleteTodo }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
  };

  const handleSave = (id) => {
    updateTodo(id, { title: editTitle, completed: false });
    setEditingId(null);
  };

  return (
    <div className="todo-container">
      <ul className="list-group">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`list-group-item d-flex justify-content-between align-items-center shadow-sm rounded-3 mb-3 px-3 py-2 ${todo.completed ? 'bg-light text-muted' : 'bg-white'}`}
          >
            <div className="d-flex align-items-center w-100">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => updateTodo(todo.id, { ...todo, completed: !todo.completed })}
                className="form-check-input me-3"
              />

              {editingId === todo.id ? (
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="form-control me-3"
                  placeholder="Edit task..."
                />
              ) : (
                <span
                  className="me-auto fs-5"
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#888' : '#333',
                  }}
                >
                  {todo.title}
                </span>
              )}

              {editingId === todo.id ? (
                <>
                  <button className="btn btn-success btn-sm me-2" onClick={() => handleSave(todo.id)}>
                    <i className="bi bi-check-circle"></i>
                  </button>
                  <button className="btn btn-secondary btn-sm me-2" onClick={() => setEditingId(null)}>
                    <i className="bi bi-x-circle"></i>
                  </button>
                </>
              ) : (
                <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleEdit(todo)}>
                  <i className="bi bi-pencil"></i>
                </button>
              )}

              <button className="btn btn-outline-danger btn-sm" onClick={() => deleteTodo(todo.id)}>
                <i className="bi bi-trash3"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
