import React, { useContext, useEffect, useState } from 'react';
import useForm from '../../hooks/form';

import { settingsProvider } from '../../context/settings/settings';
import './todo.scss'

const Todo = () => {
  const context = useContext(settingsProvider)

  const [defaultValues] = useState({
    difficulty: 4,
  });

  const { handleChange, handleSubmit } = useForm(context.addItem, defaultValues);

  // function addItem(item) {
  //   item.id = uuid();
  //   item.complete = false;
  //   console.log(item);
  //   setList([...list, item]);
  // }

  // function deleteItem(id) {
  //   const items = context.final.filter( item => item.id !== id );
  //   context.setFinal(items);
  // }

  // function toggleComplete(id) {

  //   const items = list.map( item => {
  //     if ( item.id === id ) {
  //       item.complete = ! item.complete;
  //     }
  //     return item;
  //   });

  //   setList(items);
  // }

  useEffect(() => {
    let incompleteCount = context.state.filter(item => !item.completed).length;
    let incompleteHide = context.state.filter(item => item.completed);
    context.setIncomplete(incompleteCount);
    document.title = `To Do List: ${context.incomplete}`;

  }, [context.state]);  

  return (
    <>
   

      <h1 data-testid="todo-h1" className='underHeader-2'>To Do List: {context.incomplete} items pending</h1>

      <div className='item-form'>

      
        <form onSubmit={handleSubmit} className=''>

          <h2>Add To Do Item</h2>

          <label>
            <span>To Do Item</span>
            <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
          </label>

          <label>
            <span>Assigned To</span>
            <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
          </label>

          <label>
            <span>Difficulty</span>
            <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
          </label>

          <label>
            <button type="submit">Add Item</button>
          </label>
          </form>
        </div>

    </>
  );
};

export default Todo;
