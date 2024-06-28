import TodoListItem from './TodoListItem';
import styles from './TodoList.module.css';
import SortArrow from './SortArrow';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import { useState, useEffect } from 'react';

const TodoList = ({ todoList, onRemoveTodo }) => {
  const sortFunction = (direction, list) => {
    switch (direction) {
      case 'DESC':
        setSorted({direction: direction, list: sortBy(list, 'title').reverse()});
        break;
      case 'ASC':
        setSorted({direction: direction, list: sortBy(list, 'title')});
        break;
      case 'DEFAULT':
        setSorted({direction: direction, list: list});
        break;
    }
  };

  const [sorted, setSorted] = useState({
    direction: 'DEFAULT', 
    list: todoList
  });

  const handleSort = () => {
    switch (sorted.direction) {
      case 'ASC':
        sortFunction('DESC', todoList);
        break;
      case 'DEFAULT':
        sortFunction('ASC', todoList);
        break;
      case 'DESC':
        sortFunction('DEFAULT', todoList);
        break;
    }
  };

  useEffect(() => {
    sortFunction(sorted.direction, todoList)
  }, [todoList]);

  return (
    <ul>
      <li className={`${styles.ListItem}`}>
        <span style={{width: '10%', minWidth: '30px'}}></span>
        <span className={styles.itemTitle}>To Do&nbsp;
          <span onClick={handleSort}><SortArrow direction={sorted.direction} /></span>
        </span>
        <span>Actions</span>
      </li>
      {sorted.list.map(item => {
        return <TodoListItem key={item.id} {...item} onRemoveTodo={onRemoveTodo} />
      })}
    </ul>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.array, 
  onRemoveTodo: PropTypes.func
};

export default TodoList;
