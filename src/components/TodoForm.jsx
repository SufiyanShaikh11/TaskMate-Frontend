import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo({ title, completed: false });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Add a new task" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button className="btn btn-primary" type="submit">Add</button>
      </div>
    </form>
  );
}

export default TodoForm;
