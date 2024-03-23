import { useEffect, useRef } from 'react';

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

export default InputWithLabel;
