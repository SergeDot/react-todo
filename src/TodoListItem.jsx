import styles from './TodoListItem.module.css';
import Task from './task.svg?react'

const TodoListItem = ({ id, title, onRemoveTodo }) => {

  return (
    <li className={styles.ListItem}>
      <span>
        <Task height="30px" width="30px" />
      </span>
      <span className={styles.itemTitle}>{title}</span>
      <button onClick={() => onRemoveTodo(id)}>Remove</button>
    </li>
  );
};

export default TodoListItem;
