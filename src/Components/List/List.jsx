import React, { useContext, useEffect } from 'react'
import { settingsProvider } from '../../context/settings/settings'


export default function List() {

  const list = useContext(settingsProvider)

  let localStorageData = JSON.parse(localStorage.getItem('settings'))?.showCompleted 
  
  let ele = document.querySelector('.item')
  if (!localStorageData && ele) {
    ele.classList.remove('hide')
  }

  
  return (
    <div data-testid = "contianer" className='item-cont'>
      {list.final.map(item => {

        // if (localStorageData === false  ) {
        
          return (  
          <div data-testid ="item-cont" className={localStorageData === false ? (item.completed === true ? 'hide' : 'item') : 'item'}  key={item.id}>
            <p>{item.text}</p>
            <p><small>Assigned to: {item.assignee}</small></p>
            <p><small>Difficulty: {item.difficulty}</small></p>
            <div onClick={() => list.toggleComplete(item.id)}>Complete: {item.completed.toString()}</div>
            <hr />
          </div>
          )
        
        // }
        // else if (localStorageData === true) {
          
        //   return (  
        //   <div data-testid ="item-cont" className={'item'} key={item.id}>
        //     <p>{item.text}</p>
        //     <p><small>Assigned to: {item.assignee}</small></p>
        //     <p><small>Difficulty: {item.difficulty}</small></p>
        //     <div onClick={() => list.toggleComplete(item.id)}>Complete: {item.completed.toString()}</div>
        //     <hr />
        //   </div>
        //     )
        // }
      })}
      
    </div>
  )
}
