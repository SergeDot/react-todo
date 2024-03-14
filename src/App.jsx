import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { useState } from 'react';

const App = () => {
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
      <TodoList todoList={todoList} />
    </>
  );
};

export default App;
