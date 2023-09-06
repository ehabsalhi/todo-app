import React, { useState } from "react";
import { v4 as uuid } from "uuid";

export const settingsProvider = React.createContext();

export default function Settings(props) {
  let id = 0;

  const [state, setState] = useState([
    {
      text: "text 1",
      completed: false,
      assignee: "",
      difficulty: 0,
      id: id++,
    },
    {
      text: "text 2",
      completed: false,
      assignee: "",
      difficulty: 0,
      id: id++,
    },
    {
      text: "text 3",
      completed: false,
      assignee: "",
      difficulty: 0,
      id: id++,
    },
  ]);
  const [final, setFinal] = useState(state.slice(0, 3));
  const [incomplete, setIncomplete] = useState([]);
  const [settings, setSettings] = useState({ itemsPerPage: 3, difficulty: 0 , showCompleted : true });

     function toggleComplete(id) {
     const items = state.map((item) => {
          if (item.id === id) {
          item.completed = !item.completed;
          }
          return item;
     });

     setState(items);
     }
     
     function change(number) {
          let localStorageData = JSON.parse(localStorage.getItem('settings'))

          if (number === 1) {
               setFinal(state.slice(0, localStorageData?.itemsPerPage));
          } else {  
               let sec_index = number * localStorageData?.itemsPerPage;
               let first_index = sec_index - localStorageData?.itemsPerPage;

               setFinal(state.slice(first_index, sec_index));
          }
     }

     function addItem(item) {
     item.id = uuid();
     item.completed = false;
     console.log(item);
     setState([...state, item]);
     }

     function deleteItem(id) {
     const items = state.filter((item) => item.id !== id);
     setState(items);
     }
     
     

  let values = {
     final,
     change,
     toggleComplete,
     state,
     addItem,
     deleteItem,
     incomplete,
     setIncomplete,
     setSettings,
     settings
     };

  return (
    <settingsProvider.Provider value={values}>
      {props.children}
    </settingsProvider.Provider>
  );
}
