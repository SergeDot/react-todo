import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const InputWithLabel = ({ todoTitle, handleTitleChange, children }) => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus(); 
  });

  return (
    <>
      <label htmlFor={todoTitle}>{children}</label>
      <input
        type="text"
        id={todoTitle}
        name="title"
        value={todoTitle}
        onChange={handleTitleChange}
        ref={inputRef} />
    </>
  );
};

InputWithLabel.propTypes = {
  todoTitle: PropTypes.string,
  handleTitleChange: PropTypes.func,
  children: PropTypes.element
}

export default InputWithLabel;
