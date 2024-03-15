import TodoListItem from './TodoListItem';

const TodoList = ({ todoList }) => {

  return (
    <ul>
      {todoList.map(({ id, title }) => {
        return <TodoListItem key={id} title={title} />
      })}
    </ul>
  );
};

export default TodoList;
