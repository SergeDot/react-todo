import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { useState, useEffect } from 'react';
import axios from 'axios';

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
const bearerToken = `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`;

const TodoContainer = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

// API calls
  const getAllTodos = async () => {
    const options = {
      headers: { Authorization: bearerToken },
    };

    try {
      const response = await axios.get(url, options);
      if (response.status !== 200) throw new Error(`${response.status}`);
      const data = response.data.records;
      const todos = data.map(todo => todo = { title: todo.fields.title, id: todo.id }).sort((a, b) => b.title < a.title);
      setTodoList(todos);
    } catch (error) {
      setIsError(true);
      setErrorMessage('Oopsie! Error getting the list. Please refresh the page or try again later')
      console.log(`Error getting data from the database ${error ? error.message : error}`);
    }
    setIsLoading(false);
  };

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
      console.log(`Error adding data ${error ? error.message : error}`);
    }
  };

  const removeTodo = async (id) => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: bearerToken
      },
    };

    try {
      setIsLoading(true);
      const response = await axios.delete(`${url}/${id}`, options);
      if (response.status !== 200) throw new Error(response.status);
      const { deleted: deleteConfirmed } = response.data;
      if (deleteConfirmed) {
        const newTodoList = todoList.filter(todo => todo.id !== id);
        setTodoList(newTodoList);    
      } else {
        setIsError(true);
        setErrorMessage('Oopsie! Error deleting the ToDo. Please refresh the page or try again later');  
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage('Oopsie! Error deleting the ToDo. Please refresh the page or try again later');
      console.log(`Error deleting data ${error ? error.message : error}`);
    }
    setIsLoading(false);
  };

  // functions
  useEffect(() => {
    getAllTodos();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList]);

  if (isError) {
    return (<>
      <h1>
        Todo List
      </h1><p>{errorMessage}</p>
      </>)
  }

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
  )
}

export default TodoContainer;
