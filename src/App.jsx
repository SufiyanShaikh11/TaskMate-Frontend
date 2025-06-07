import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, ''); // remove trailing slash if any
const API = `${BASE_URL}/api/todos`;

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API, { withCredentials: true }); // support cookies if needed
      setTodos(res.data);
    } catch (error) {
      console.error('❌ Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (todo) => {
    try {
      const res = await axios.post(API, todo, { withCredentials: true });
      setTodos([...todos, res.data]);
    } catch (error) {
      console.error('❌ Error adding todo:', error);
    }
  };

  const updateTodo = async (id, updated) => {
    try {
      const res = await axios.put(`${API}/${id}`, updated, { withCredentials: true });
      setTodos(todos.map(t => t.id === id ? res.data : t));
    } catch (error) {
      console.error('❌ Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, { withCredentials: true });
      setTodos(todos.filter(t => t.id !== id));
    } catch (error) {
      console.error('❌ Error deleting todo:', error);
    }
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
