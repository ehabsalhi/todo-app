import React, { useState, useContext, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { LoginContext } from "./login";
import axios from "axios";

export const settingsProvider = React.createContext();

export default function Settings(props) {
  let id = 0;

 let on = [
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
  ]
  const [state, setState] = useState([]);
  const [final, setFinal] = useState(state.slice(0, 3));
  const [incomplete, setIncomplete] = useState([]);
  const [update , setUpdate] = useState([]);
  const [settings, setSettings] = useState({ itemsPerPage: 3, difficulty: 0, showCompleted: true });
  const {capabilities} = useContext(LoginContext)


   function toggleComplete(id) {
    if (capabilities.includes('update')) {
         
      const items =  state.map( async (item) => {
           if (item.id === id) {
             item.completed = !item.completed;
             try {
              item.id = id
               const res = await axios.put(`https://auth-api-fz5h.onrender.com/todo/${id}`, item)
               setUpdate(res.data.data)
             } catch (err) {
               console.log('update error' . err);
             }
           }
           return item;
      });

      // setState(items);
    }
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

  async function addItem(item) {
    console.log(item);
    try {
      item.completed = false;
      const res  = await axios.post(`https://auth-api-fz5h.onrender.com/todo` , item)
         
       setState([...state, res.data.data]);
    } catch (err) {
      console.log('post' , err);
    }
     }
  

  async function deleteItem(id) {
    if (capabilities.includes('delete')) {
      try {
         await axios.delete(`https://auth-api-fz5h.onrender.com/todo/${id}`)
      } catch (err) {
        console.log('delete error');
      }

    const items = state.filter((item) => item.id !== id);
    setState(items);
    }
  }
  
  async function getData() {
    try {
      const res = await axios.get('https://auth-api-fz5h.onrender.com/todo')
      console.log(res.data.data);
      setState(res.data.data)
    } catch (err) {
      console.log(err);
    }
  }
   
  useEffect(() => {
    getData()
  },[])
     

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
    settings,
    deleteItem
};

  return (
    <settingsProvider.Provider value={values}>
      {props.children}
    </settingsProvider.Provider>
  );
}
