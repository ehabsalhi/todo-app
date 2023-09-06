import React, { useContext } from 'react'
import { settingsProvider } from '../../context/settings/settings'
import { Link } from "react-router-dom";
import './Header.scss'




export default function Header() {
     const context = useContext(settingsProvider)

  return (
       <>
            <header data-testid="todo-header" className='header'>
                 <div className='links'>
                      <Link to = '/'>Home</Link>
                      <Link to='settings'>Settings</Link>
                 </div>
                 {/* <h1 data-testid="todo-h1">To Do List: {context.incomplete} items pending</h1> */}
          </header>
       </>
  )
}
