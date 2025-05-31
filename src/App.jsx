import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const API = 'http://localhost:8080/api/todos';

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await axios.get(API);
    setTodos(res.data);
  };

  useEffect(() => { fetchTodos(); }, []);

  const addTodo = async (todo) => {
    const res = await axios.post(API, todo);
    setTodos([...todos, res.data]);
  };

  const updateTodo = async (id, updated) => {
    const res = await axios.put(`${API}/${id}`, updated);
    setTodos(todos.map(t => t.id === id ? res.data : t));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">To-Do List</h2>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
