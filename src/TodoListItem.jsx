const TodoListItem = ({ id, title, onRemoveTodo }) => {

  return (
    <li>
      {title}
      &nbsp;
      <button onClick={() => onRemoveTodo(id)}>Remove</button>
    </li>
  );
};

export default TodoListItem;
