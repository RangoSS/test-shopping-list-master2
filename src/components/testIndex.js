




////////
import React from 'react';
import ReactDOM from 'react-dom';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
//import rootReducer from './reducer'; // Import your root reducer
//import rootReducer from './components/redux/reducer'

import rootReducer from './components/redux/reducer'
import App from './App';

// Create the Redux store
const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

