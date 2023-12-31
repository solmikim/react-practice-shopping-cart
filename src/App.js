import { TopNavigation } from './modules/TopNavigation'; // 절대 경로로 변경하기
import { Footer } from './modules/Footer';
import { ProductPage } from './routes/ProductPage';
import { ShoppingCartPage } from './routes/ShoppingCartPage';
import { useDispatch } from 'react-redux';
import { useEffect, useState} from 'react';
import { User } from './models/User';
import { Coupon } from './models/Coupon';
import { Product } from './models/Product';
import { ShoppingCart } from './models/ShoppingCart';
import {coupons , productItems} from './constants/Product';
import { setUserInformation } from './store/actions';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();

  const initCoupons = () => {
    return coupons.map(coupon => {
        return new Coupon(coupon.type, coupon.title, coupon.discountRate || coupon.discountAmount);
    });
  }

  const initShoppingCart = () => {
    return new ShoppingCart();
  }

  const initProducts = () => {
    return  productItems.map(item => {
      return new Product(item.item_no, item.item_name, item.detail_image_url, item.price, item.score, item.availableCoupon);
    }); 
  }

  const initUser = () => {
    dispatch(setUserInformation(new User('김이구', initCoupons(), initShoppingCart())))
  }
 
  useEffect(()=>{ 
    initUser();
  }, []);

  return (
    <div>
      <Router>
        <TopNavigation></TopNavigation>
          <Routes>
            <Route path="/" element={<ProductPage products={initProducts()}/>}></Route>
            <Route path="/products" element={<ProductPage products={initProducts()}/>}></Route>
            <Route path="/cart" element={<ShoppingCartPage/>}></Route>
          </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
