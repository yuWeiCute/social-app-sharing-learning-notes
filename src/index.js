import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import './index.css';
import './shared/utils/cursor.js';
import './shared/utils/alert.js';
// import { createStore } from 'redux'
// import allReducers from './reducers'
import { Provider } from 'react-redux'
import store from './redux/store'

/* let store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
) */

//STORE   -->globalized state



//ACTION   --> incrementnn  what you want do          be called    a function returning an object

/* let increment = () => {
  return {
    type: 'increment'
  }
}
let decrement = () => {
  return {
    type: 'decrement'
  }
} */
//REDUCER   --> your actions transform the state into the next state        be checked    modify the store 

/* const counter = (state = 0, action) => {
  switch(action.type){
    case "increment":
      return state+1;
    case "decrement":
      return state-1;
  }
}

let store = createStore(counter) */
//DISPATCH   --> dispatch this action to the reducer, so the reducer will checkout what to do, then these store gets updated
/* StorageEvent.subscribe(() => console.log(store.getState()))

store.dispatch(increment());
store.dispatch(decrement()); */


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

