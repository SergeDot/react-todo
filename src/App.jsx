import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { useState, useEffect } from 'react';
import axios from 'axios';

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
const bearerToken = `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`;

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = async () => {
    const options = {
      headers: { Authorization: bearerToken },
    };

    try {
      const response = await axios.get(url, options);
      if (response.status !== 200) throw new Error(`${response.status}`);
      const data = response.data.records;
      const todos = data.map(todo => todo = { title: todo.fields.title, id: todo.id });
      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setErrorMessage('Oopsie! Error getting the list. Please refresh the page or try again later')
      setIsLoading(false);
      console.log(`Error getting data from the database ${error.message}`);
    }
  };

  useEffect(() => {
    new Promise((resolve, reject) => { setTimeout(() => resolve(fetchData()), 2000) });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList]);

  const addTodo = async (newTodo) => {
    let todo = JSON.stringify({ "fields": newTodo });
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: bearerToken
      },
    };

    try {
      const response = await axios.post(url, todo, options);
      if (response.status !== 200) throw new Error(response.status);
      const { id: todoId, fields: { title: todoTitle } } = response.data;
      todo = { id: todoId, title: todoTitle };
      setTodoList([todo, ...todoList]);
    } catch (error) {
      setIsError(true);
      setErrorMessage('Oopsie! Error adding a new ToDo. Please refresh the page or try again later');
      console.log(`Error adding data ${error.message}`);
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
      {isError
        ? (<p>{errorMessage}</p>)
        : isLoading
          ? (<p>Loading...</p>)
          : (<>
            <AddTodoForm onAddTodo={addTodo} />
            <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
          </>)
      }
    </>
  );
};

export default App;
