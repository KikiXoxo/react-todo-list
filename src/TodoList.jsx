import TodoItem from './TodoItem';

const TodoList = ({ todos, toggleTodo, deleteTodo }) => {
  return (
    <ul className='list'>
      {
        todos.length === 0 && <p>No todos</p>
        // Render message only when there are no todos (short circuiting)
      }

      {todos.map(todo => {
        return (
          // <TodoItem id={todo.id} completed={todo.completed} title={todo.title} key={todo.id}/>
          // The below instead is more concise
          <TodoItem
            {...todo}
            key={todo.id}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
