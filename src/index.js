import React from "react";
import { createRoot } from 'react-dom/client'; //R18 code
//import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import './index.css'

import reducers from './reducers'

import App from './App';

const store = createStore(reducers, compose(applyMiddleware(thunk)));


const container = document.getElementById('root'); //R18 code
const root = createRoot(container); //R18 code

root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);

// ReactDOM.render(
//   <Provider store={store}>
//     <App/>
//   </Provider>,
//   document.getElementById('root')
// );
