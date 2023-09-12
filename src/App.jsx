import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Main from './Main';
import SettingsPage from './Components/Settings/SettingsPage';
import Settings from './context/settings/settings';
import Header from './Components/Header/Header';
import Login, { LoginContext } from './context/settings/login';

export default class App extends  React.Component {
  render() {
    return (
      <>
        <Login>
        <Settings>
         <Header />
            <Routes>
                <Route path='/' element ={<Main />}/>
                <Route path='/settings' element ={<SettingsPage/>}/>
            </Routes>
          </Settings>
          </Login>

      </>
    );
  }
}
