import styles from '../css/shopping-cart.module.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const ShoppingCartPage = () => {
    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);
    const [totalOrderPrice, setTotalOrderPrice] = useState(0);
    const [totalTotalPaymentPrice, setTotalPaymentPrice] = useState(0);

    const user = useSelector(state => state.userInformation);
    const [shoppingCartItems, setShoppingCartItems] = useState(user ?  user.shoppingCart.selectedProducts : []);
    const [coupons, setCoupons] = useState(user ?  user.coupons : []);
    const [selectedCoupon, setSelectedCoupon] = useState(user ? user.coupons[0] : '');

    const calculateTotalOrderAmount = () => {
        if(checkedItems.length == 0 ){
            setTotalOrderPrice(0);
        }else {
            const price = checkedItems.reduce((sum, currentValue) => {return sum + currentValue.price}, 0);
            setTotalOrderPrice(price.toLocaleString());
        }
    }

    const onChangeSelectedCoupon = (e) => {
        const coupon = coupons.find(coupon => coupon.title === e.target.value);
        setSelectedCoupon(coupon);
    }

    const calculateTotalPaymentPrice = () => {
        if(checkedItems.length === 0) {
            setTotalPaymentPrice(0);
            return;
        }

        const deliveryPrice = 3000;
        const nonCouponableItem = checkedItems.filter(item => !item.availableCoupon);
        const nonCouponableItemPrice = nonCouponableItem.reduce((sum, currentValue) => {return sum + currentValue.price}, 0);
        const couponableItem = checkedItems.filter(item => item.availableCoupon);
        const couponableItemPrice = couponableItem.reduce((sum, currentValue) => {return sum + currentValue.price}, 0);

        switch(selectedCoupon.type){
            case 'rate' : {
                const price =  (couponableItemPrice - (couponableItemPrice * (selectedCoupon.discountValue / 100))) + nonCouponableItemPrice + deliveryPrice;
                setTotalPaymentPrice(price.toLocaleString());
                break;
            }

            case 'amount' : {
                const discountedPrice = couponableItemPrice - selectedCoupon.discountValue;
                const price =  discountedPrice > 0 ? discountedPrice + nonCouponableItemPrice + deliveryPrice : nonCouponableItemPrice + deliveryPrice;

                setTotalPaymentPrice(price.toLocaleString());

            }
        }
    }

    const checkAllProducts = async (e) => {
        if (e.target.checked) {
          setIsCheckedAll(true);
          setCheckedItems(shoppingCartItems);
        } else {
          setIsCheckedAll(false)
          setCheckedItems([])
        }
    }
    
      const checkSelectedProduct = (e, product) => {
        setIsCheckedAll(false);
        
        if(checkedItems.find(arr => arr === product)){
            setCheckedItems(checkedItems.filter(arr => arr !== product))
        }else {
            setCheckedItems((preCheckedItems) => [...preCheckedItems, product]);
        }
      }
    
      useEffect(() => {
        if (checkedItems.length !== 0 && checkedItems.length === shoppingCartItems.length) {
          setIsCheckedAll(true)
        }

        calculateTotalOrderAmount();
        calculateTotalPaymentPrice();
      }, [checkedItems, selectedCoupon])
    
    
    return (
        <div>
            <div className={styles.shoppingCartWrapper}>
                {
                    shoppingCartItems && shoppingCartItems.length == 0 ? 
                    (   <>
                            <div className={styles.shoppingCartEmptyMessageWrapper}>
                                <div className={styles.shoppingCartEmptyMessage}>! 장바구니에 담은 상품이 없습니다.</div>
                            </div>                
                        </>
                    )
                    : (
                        <>
                            <div className={styles.shoppingCartTitle}>01 SHOPPING BAG</div>
                            <div className={styles.shoppingCartListWrapper}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                <input type='checkbox' onChange={ e => checkAllProducts(e)} checked={isCheckedAll}/>
                                            </th>
                                            <th>상품 정보</th>
                                            <th>수량</th>
                                            <th>주문 금액</th>
                                            <th>배송비</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            shoppingCartItems.map(product => {
                                                return (
                                                    <tr key={product.no}>
                                                        <td>
                                                            <input type='checkbox' checked={product.isSelectedShoppingCart(checkedItems)} onChange={e => checkSelectedProduct(e, product)}/>
                                                        </td>
                                                        <td className={styles.productInfo}>
                                                            <div className={styles.productImage}><img src={product.imageUrl}/></div>
                                                            <div className={styles.productDetail}>
                                                                <div>{product.name}</div>
                                                                <div>{product.getPrice()}원</div>
                                                            </div>
                                                        </td>
                                                        <td>수량</td>
                                                        <td>{product.getPrice()}원</td>
                                                        <td>3,000원</td>
                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>

                            <div className={styles.totalPriceWrapper}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>총 주문 금액</th>
                                            <th>배송비</th>
                                            <th>쿠폰</th>
                                            <th>총 결제 금액</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {totalOrderPrice} 원
                                            </td>
                                            <td> + 3,000 원</td>
                                            <td>
                                                -
                                                <select value={selectedCoupon.title} onChange={onChangeSelectedCoupon}>
                                                    {
                                                        coupons.map((coupon, index) => {
                                                            return (
                                                                <option value={coupon.title} key={index} >{coupon.title}</option>
                                                            )
                                                        })
                                                    }
                                                    
                                                </select>
                                            </td>
                                            <td>{totalTotalPaymentPrice}원</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className={styles.buttons}>
                                <div><Link to='/products'>CONTINUE SHOPPING</Link></div>
                                <div><button>CHECK OUT</button></div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}