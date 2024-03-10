import TodoListItem from './TodoListItem';

const TodoList = ({todoList}) => {

  return (
    <ul>
      {todoList.map(({id, ...item}) => {
        return <TodoListItem key={id} {...item} />
      })}
    </ul>
  );
};

export default TodoList;
