import { useState } from 'react';
import InputWithLabel from './InputWithLabel';

const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState([]);
  const [isInvalid, setIsInvalid] = useState(true);

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
    
    // check for empty string
    if (newTodoTitle && newTodoTitle.trim()) {
      setIsInvalid(false);
    } else {
      setIsInvalid(true);
    }
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo({ title: todoTitle });
    setTodoTitle('');
  };

  return (
    <form action="submit" onSubmit={handleAddTodo}>
      <InputWithLabel todoTitle={todoTitle} handleTitleChange={handleTitleChange} isFocused >
        Title
      </InputWithLabel>
      <button disabled={isInvalid}>Add</button>
    </form>
  );
};

export default AddTodoForm;
