import { useState, useEffect } from 'react';
import InputWithLabel from './InputWithLabel';

const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  useEffect(() => {
    // check for empty string
    if (todoTitle.length && todoTitle.trim()) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [todoTitle]);

  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo({ title: todoTitle });
    setTodoTitle('');
  };

  return (
    <form action="submit" onSubmit={handleAddTodo}>
      <InputWithLabel todoTitle={todoTitle} handleTitleChange={handleTitleChange} >
        Title
      </InputWithLabel>
      <button disabled={isDisabled}>Add</button>
    </form>
  );
};

export default AddTodoForm;
