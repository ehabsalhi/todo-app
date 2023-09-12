import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import jwtDecode from "jwt-decode";
import cookie from 'react-cookies';

export const LoginContext = createContext()

export default function Login(Props) {

     const [username , setUsername] = useState('')
     const [password, setPassword] = useState('')
     const [capabilities, setCapabilities] = useState([])
     const [logedin, setLogedin] = useState(false)
     const [user, setUser] = useState({});

     

     async function handelSingUp(user, pass , role) {
          try {
         let res = await axios.post('https://auth-api-fz5h.onrender.com/signup', {
              username: user,
              password : pass,
               role : role
         }) 
         console.log(res);      
          } catch (err) {
               console.log('login ', err);
          }
     }

     async function handelLogin(user, pass) {
          console.log(user , pass);
          try {
               let res = await axios.post('https://auth-api-fz5h.onrender.com/signin', {}, {
                    headers: { Authorization: `Basic ${btoa(`${user}:${pass}`)}` }
               }) 
               console.log(res.data.message.user);    
               getToken(res.data.message.user.token , res.data.message.user.capabilities)
          } catch (err) {
               console.log('login ' , err);}
     }

     function getToken(token, user) {
          let isToken = jwtDecode(token)

          if (isToken) {
               setCapabilities(user)
               setLogedin(true)
               cookie.save('auth', token)
               localStorage.setItem('user' , JSON.stringify(user))
          }
     }

     const logout = () => {
          setLogedin(false);
          setUser({})
          cookie.remove('auth')
          localStorage.removeItem('user')
        }

     useEffect(() => {
          const authCookie = cookie.load('auth')
          const userCookie = localStorage.getItem('user')
          if (authCookie && userCookie) {
               getToken(authCookie  ,JSON.parse(userCookie) )
          } else {
               setLogedin(false)
          }
     },[])

     // console.log(capabilities);
     // console.log(logedin);

     let values = {
          setUsername,
          setPassword,
          username,
          password,
          handelSingUp,
          handelLogin,
          logout,
          logedin,
          capabilities
     }


 return (
       
     <LoginContext.Provider value={values}>
            {Props.children}
    </LoginContext.Provider>
)
}
