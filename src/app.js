import React from 'react';

import Customer from './components/Customer-Page/customer.js';
import SignIn from './components/SignIn/signin.js';
import Header from './components/Header/header.js'
import Admins from './components/Admin-Page/AdminPage.js';
import HomePage from './components/Homepage/homePage.js' 
import { Route, useParams } from 'react-router-dom';


const App = () => {
  return (
    <>
      <Header/>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path='/customer'>
         <Customer/>
      </Route>
      <Route exact path="/signin">
        <SignIn />
      </Route>
      <Route exact path="/admins">
        <Admins />
      </Route>
    </>
  );
};

export default App;