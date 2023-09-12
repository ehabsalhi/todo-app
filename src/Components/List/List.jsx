import React, { useContext, useEffect } from 'react'
import { settingsProvider } from '../../context/settings/settings'
import { LoginContext } from '../../context/settings/login'


export default function List() {

  const list = useContext(settingsProvider)
  const {capabilities} = useContext(LoginContext)
    console.log(capabilities);
  let localStorageData = JSON.parse(localStorage.getItem('settings'))?.showCompleted 
  
  let ele = document.querySelector('.item')
  if (!localStorageData && ele) {
    ele.classList.remove('hide')
  }

  
  return (
    <div data-testid = "contianer" className='item-cont'>
      {list.final.map(item => {

        
          return (  
          <div data-testid ="item-cont" className={localStorageData === false ? (item.completed === true ? 'hide' : 'item') : 'item'}  key={item.id}>
            <p>{item.text}</p>
            <p><small>Assigned to: {item.assignee}</small></p>
              <p><small>Difficulty: {item.difficulty}</small></p>
              {
                console.log(item.completed)
              }
              <div onClick={() => list.toggleComplete(item.id)}>Complete: {item.completed?.toString()}</div>
              <button onClick={() => list.deleteItem(item.id)}>delete</button>
            <hr />
          </div>
          )
        
  
      })}
      
    </div>
  )
}
