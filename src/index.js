import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./css/common.css";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ProductPage } from './routes/ProductPage';
import { ShoppingCartPage } from './routes/ShoppingCartPage';

const store = createStore(reducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
      
      <Routes>
        {/* <Route path='/' exact={true} Component={ProductPage}></Route> */}
        <Route path="/products" component={ProductPage}></Route>
        <Route path="/cart" component={ShoppingCartPage}></Route>
      </Routes>
    </Router>
);

