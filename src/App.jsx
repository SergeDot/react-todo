import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { useState, useEffect, useCallback } from 'react';

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

const App = () => {

  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // useCallBack for pessimistic rendering
  const callbackFetchData = useCallback(async () => {
    console.log(`16`);
    const options = {
      method: "GET",
      headers: { Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}` },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`${response.status}`);
      const { records: data } = await response.json();
      const todos = data.map(todo => todo = { title: todo.fields.title, id: todo.id });
      return todos;
    } catch (error) {
      console.log(error);
    }
  }, [isLoading, isAdding]);

  useEffect(() => {
    if (isLoading) {
      new Promise((resolve, reject) => { setTimeout(() => resolve(callbackFetchData()), 2000) })
        .then(result => {
          setTodoList(result || []);
          setIsLoading(false);
        });
    }
    
    if (isAdding) {
      new Promise((resolve, reject) => resolve(callbackFetchData()))
        .then(result => {
          setTodoList(result || []);
          setIsAdding(false);
        })
    }
  }, [callbackFetchData]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList]);

  const addTodo = async (newTodo) => {
    let todo = JSON.stringify({ "fields": newTodo });
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      },
      body: todo
    };
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`${response.status}`);
      const { id: todoId, fields: { title: todoTitle } } = await response.json();
      todo = { id: todoId, title: todoTitle }
      setIsAdding(true)
      setTodoList([todo, ...todoList]);
    } catch (error) {
      console.log(error);
    }
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
      {isLoading
        ? (<p>Loading...</p>)
        : (<TodoList todoList={todoList} onRemoveTodo={removeTodo} />)
      }
    </>
  );
};

export default App;
