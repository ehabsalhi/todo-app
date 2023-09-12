import React, { useContext } from 'react'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Settings from './context/settings/settings'
import List from './Components/List/List'
import Demo from './Components/Pagination/Pagination'
import Todo from './Components/Todo'
import { LoginContext } from './context/settings/login'

export default function Main() {
  const { logedin  } = useContext(LoginContext)

  return (
    <div>
      {logedin &&
      <>
      <Todo/>
      <List/>
      <Demo/>
      <Footer/>
      </>
    }
    </div>
  )
}
