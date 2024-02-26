const TodoList = () => {
  const todoList = [{
    id: 1,
    title: "451 Fahrenheit",
    author: "Ray Bradbury",
    state: "California",
    country: "USA"
  }, {
    id: 2,
    title: "The Catcher in the Rye",
    author: "Jerome David Sallinger",
    state: "New Hampshire",
    country: "USA"
  }, {
    id: 3,
    title: "The Lord of Flies",
    author: "William Golding",
    state: "Cornwall",
    country: "UK"
  }];

  return (
    <ul>
    {todoList.map(item => {
      return <li key={item.id}>{item.title}</li>
    })}
  </ul>    
  )
}

export default TodoList
