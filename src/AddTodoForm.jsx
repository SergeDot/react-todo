import { useState } from 'react';

const AddTodoForm = ({ onAddTodo }) => {
  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo({ title: todoTitle, id: Date.now() });
    setTodoTitle('');
  };

  const [todoTitle, setTodoTitle] = useState([]);

  return (
    <form action="submit" onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title</label>
      <input type="text" id="todoTitle" name="title" value={todoTitle} onChange={handleTitleChange} />
      <button>Add</button>
    </form>
  );
};

export default AddTodoForm;
