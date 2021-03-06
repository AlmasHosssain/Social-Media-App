import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index'
import jwtDecoder from 'jwt-decode'
import * as Types from './store/action/type'
import authToken from './utill/authToken'

let token = localStorage.getItem('userToken')
if (token) {
  let decode = jwtDecoder(token)
  authToken(token)
  store.dispatch({
    type : Types.SET_USER,
    payload : {
      user : decode
    }
  })
}


ReactDOM.render(
  
  <Provider store={store} >
    <Router>
      <App />
    </Router> 
  </Provider>
 ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
