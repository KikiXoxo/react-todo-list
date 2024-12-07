import { useState } from 'react';

const NewTodoForm = ({ onSubmit }) => {
  const [newItem, setNewItem] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    // Update Todos array everytime there is a re-render ie spread existing array, add new item to list and them put all into new array (which todos will be updated to)
    // setTodos([
    //   ...todos,
    //   { id: crypto.randomUUID(), title: newItem, completed: false },
    // ]);
    // setTodos([
    //   ...todos,
    //   { id: crypto.randomUUID(), title: newItem, completed: false },
    // ]);

    // However this isnt the best way. If setTodos is called twice in a row, during the new rendering, the first setTodos will take the empty array as todos value before the new item is added. However the second todos will also take the empty array as todos value, even though one would expect it would use the updated value from the first function called
    // This is because both times setTodos is being called, it is during a single render, so both will use the same todos value of the empty attay. To deal with this, we do this instead

    // If you wnat to be able to modify your existing data, you need to pass a function to the set state (setTodos). This function will return whatever you want the new state to be. This function of setTodos takes in one parameter (standard) which is the current value for whatever your state is
    // setTodos(currentTodos => {
    //   return [
    //     ...currentTodos,
    //     { id: crypto.randomUUID(), title: newItem, completed: false },
    //   ];
    // });
    // setTodos(currentTodos => {
    //   return [
    //     ...currentTodos,
    //     { id: crypto.randomUUID(), title: newItem, completed: false },
    //   ];
    // });

    // This second way is called the functional updater form while the first is called the normal form. If what you want to update relies on the previous value, or you're running multiple updates in a singer render,  use the functional form, it makes sure you dont end up using stale values
    // If you are resetting or replacing values completely without relying on the previous ones, then the normal form is fine eg setCount(5) or setArray([]). This value here has nothing to do with the previous ones. But when in doubt, just to be safe, you can also just use the functional update form everytime to avoid making errors

    // I'm commenting it out though cuz for actual purposes, this function will be in App.jsx in an addTodo function. Then we created an onSubmit prop here which was then passed to the NewTodoForm tag in the App.jsx file. And the value of this onSubmit prop is addTodo

    if (newItem === '') return;

    onSubmit(newItem);

    setNewItem('');
  }

  return (
    <form onSubmit={handleSubmit} className='new-item-form'>
      <div className='form-row'>
        <label htmlFor='item'>New Item</label>
        <input
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          type='text'
          name=''
          id='item'
        />
        {/* The default value is newItem (empty string). Then anytime there is a change within the input, onChange is run (specifically for just react, onChange works differently in pure JS) which then calls the updater function (setNewItem) which now updates newItem, which now allows whatever is being typed to actually show and be retained. If onChange wasnt used, the input value would always remain an empty string no matter what you keep trying to type */}
      </div>

      <button className='btn'>Add</button>
    </form>
  );
};

export default NewTodoForm;
