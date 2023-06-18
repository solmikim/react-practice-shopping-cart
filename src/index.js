import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./css/common.css";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer'

import { ProductPage } from './routes/ProductPage';
import { ShoppingCartPage } from './routes/ShoppingCartPage';

const store = createStore(reducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <Provider store={store}>
        <App />
      </Provider>

);

