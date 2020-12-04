import React from 'react';
import './App.css';
import { Switch,Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Registration from '../pages/Registration'
import Navigation from './navigation/Navigation'
import Profile from '../pages/Profile'
import Post from '../pages/Post'
import Message from '../pages/Message'
import Forget from '../components/userUpdate/ForgetPassword'
import LoginUpdate from '../components/userUpdate/LoginUpdate'

function App() {
  return (
     <div className="App container">
        <Navigation/>
        <Switch>
           <Route exact path= '/' component={Home} />
           <Route exact path='/registration' component={Registration} />
           <Route exact path='/login' component={Login} />
           <Route exact path='/profile' component={Profile} />
           <Route exact path='/post' component={Post} />
           <Route exact path='/message' component={Message}/>
           <Route exact path='/passwordChangeEmail' component={Forget} />
           <Route exact path='/changePassword' component={LoginUpdate}/>
        </Switch>
     </div>

  );
}

export default App;
