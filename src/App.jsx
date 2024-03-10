import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { useState } from 'react';

function App() {
  const [newTodo, setNewTodo] = useState('');
  const addTodo = (newTodo) => {
    setTodoList([newTodo, ...todoList])
  };
  const [todoList, setTodoList] = useState([]);

  return (
    <>
      <h1>
        Todo List
      </h1>
      <AddTodoForm onAddTodo={addTodo} />
      <p>{newTodo}</p>
      <TodoList todoList={todoList}/>
    </>
  );
};

export default App;
