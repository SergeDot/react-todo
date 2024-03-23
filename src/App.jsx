import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { useState, useEffect } from 'react';

const useSemiPersistentState = () => {
  const [value, setValue] = useState(JSON.parse(localStorage.getItem('savedTodoList')) || []);
  useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(value));
  }, [value]);
  return [value, setValue];
};

const App = () => {
  const [todoList, setTodoList] = useSemiPersistentState();
  const addTodo = (newTodo) => {
    setTodoList([newTodo, ...todoList])
  };

  const removeTodo = (id) => {
    const newTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(newTodoList);
  };

  return (
    <>
      <h1>
        Todo List
      </h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </>
  );
};

export default App;
