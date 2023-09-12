import React, { useContext, useState } from 'react'
import { settingsProvider } from '../../context/settings/settings'
import { Link } from "react-router-dom";
import './Header.scss'
import { LoginContext } from '../../context/settings/login';




export default function Header() {
     const context = useContext(settingsProvider)
     const { handelSingUp , handelLogin , logedin  ,logout} = useContext(LoginContext)
     
     
     const [username , setUsername] = useState('')
     const [password, setPassword] = useState('')
     const [role, setRole] = useState('')
     const [signup, setSignup] = useState(false)
     

    const handelSubmitLogin = (e) => {
         e.preventDefault()
         handelLogin(username, password)
         console.log('login');
     }
    const handelSubmitSingUp = (e) => {
         e.preventDefault()
         handelSingUp(username, password, role)
         console.log('signup');

     }

  return (
       <>
            <header data-testid="todo-header" className='header'>
                 { 
                  !logedin && (
                      !signup ?
                 <div>
                      <div className="login">
                           <form onSubmit={handelSubmitLogin}>
                           <input type="text"  placeholder='usename' onChange={(e) => setUsername(e.target.value)}/>
                           <input type="password" placeholder='password'  onChange={(e) => setPassword(e.target.value)}/>
                           <div>
                              <button type="submit">Login</button>
                           </div>
                           </form>
                      </div>
                 </div> : 
                 
                 <div>
                      <div className="signup">
                           <form onSubmit={handelSubmitSingUp}>
                           <input type="text"  placeholder='usename' onChange={(e) => setUsername(e.target.value)}/>
                           <input type="password" placeholder='password'  onChange={(e) => setPassword(e.target.value)}/>
                           <input type="text" placeholder='role'  onChange={(e) => setRole(e.target.value)}/>
                           <div>
                              <button type="submit">signup</button>
                           </div>
                           </form>
                      </div>
                 </div> )
                 }
                 {
                    logedin ?  <button onClick={() => logout()}>logout</button>
                    :<button onClick={() => { setSignup(!signup)}}>{ signup ? 'login' : ' signup' }</button>
                 }


                 <div className='links'>
                      <Link to = '/'>Home</Link>
                      <Link to='settings'>Settings</Link>
                 </div>
          </header>
       </>
  )
}
