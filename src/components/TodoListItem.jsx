import styles from './TodoListItem.module.css';
import Task from '../assets/task.svg?react';
import PropTypes from 'prop-types';

const TodoListItem = ({ id, title, onRemoveTodo }) => {

  return (
    <li className={styles.ListItem}>
      <span style={{width: '10%', minWidth: '30px'}}>
        <Task height="30px" width="30px" />
      </span>
      <span className={styles.itemTitle}>{title}</span>
      <button onClick={() => onRemoveTodo(id)}>Remove</button>
    </li>
  );
};

TodoListItem.propTypes = {
  id: PropTypes.string, 
  title: PropTypes.string, 
  onRemoveTodo: PropTypes.func
}

export default TodoListItem;
