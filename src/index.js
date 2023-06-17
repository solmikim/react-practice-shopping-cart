import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./css/common.css";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer'

const store = createStore(reducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

