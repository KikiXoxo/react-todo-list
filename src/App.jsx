import { useEffect, useState } from 'react';
import './styles.css';
import NewTodoForm from './NewTodoForm';
import TodoList from './TodoList';

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem('ITEMS');
    if (localValue === null) return []; // return empty array if there is nothing on local sorage

    return JSON.parse(localValue);
  });

  // Takes two parameters. The second one is what is being watched and it is placed inside an array, and when that value changes, the first parameter which is a function will be run. This is how useEffect works
  useEffect(() => {
    localStorage.setItem('ITEMS', JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
  }

  function toggleTodo(id, completed) {
    // Remember that onChange is used below in the list items input (checkboxes). when it runs, toggleTodo is run using e.target.checked as its second parameter. Which now makes e.target.checked true.
    // Here in the function being called, completed parameter will take e.target.checked's value as its own, which will be true.

    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) return { ...todo, completed };
        // Object spread operator used here. It spreads todo to a new object, for the ", completed" part, since completed is already a property in the object, the original value of it is overriden with the one passed into toggleTodo function (changes from false to true).
        // Note that if we had "if (todo.id === id) return { ...todo, message: "Hi" };" instead, then a new object would be created which still retains the previous value of completed (false), and a new property called message would have been added

        return todo; // If id doesnt match, return that element as is
      });
    });
  }

  // Keep all todos with id that doesn't match current id
  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id);
    });
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className='header'>Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}
