import styles from '../css/product.module.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {addProductToShoppingCart, removeProductToShoppingCart} from '../store/actions';
import { useState } from 'react';

export const Product = ({product}) => { 
    const dispatch = useDispatch();
    let user = useSelector(state => state.userInformation);
    const [shoppingCart, setShoppingCart] = useState(user ?  user.shoppingCart.selectedProducts : []);
    
    const addToShoppingCart = (product) => {
        if(!user || user.shoppingCart.isProductInCart(product) || user.shoppingCart.getCartItemCount() == 3) return;
        
        user.shoppingCart.selectedProducts.push(product);
        dispatch(addProductToShoppingCart(user.shoppingCart.getCartItemCount()));
        setShoppingCart(items => [product, ...items]);
    }

    const removeFromShoppingCart = (product) => {
        if(!user || !user.shoppingCart.isProductInCart(product)) return;

        user.shoppingCart.selectedProducts = user.shoppingCart.selectedProducts.filter((selectedProduct) => selectedProduct !== product);
        setShoppingCart(user.shoppingCart.selectedProducts);
        dispatch(removeProductToShoppingCart(user.shoppingCart.getCartItemCount()));
    }

    return (
        <div>
            <div className={styles.productWrapper}>
                <div className={styles.productImage}><img src={product.imageUrl}/></div>
                <div className={styles.productName}>{product.name}</div>
                <div className={styles.productPrice}>{product.getPrice()}원</div>
                <div className={styles.shoppingCart}>
                    {
                        shoppingCart.includes(product) ? (
                            <button onClick={() => removeFromShoppingCart(product)}>장바구니 빼기</button>
                        ) : 
                        (
                            <button onClick={() => addToShoppingCart(product)}>장바구니 담기</button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}