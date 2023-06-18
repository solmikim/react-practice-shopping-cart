
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../css/shopping-cart.module.css';

export const ShoppingCartPage = () => {
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheckingBox, setIsCheckingBox] = useState(false);
    const [checkedArr, setCheckedArr] = useState([]);
    const [tottalPrice, setTotalPrice] = useState(0);
    const [totalPaymentPrice, setPaymentPrice] = useState(0);

    const user = useSelector(state => state.userInformation);
    const [shoppingCartItems, setShoppingCartItems] = useState(user ?  user.shoppingCart.selectedProducts : []);
    const [coupons, setCoupons] = useState(user ?  user.coupons : []);
    const [selectedCoupon, setSelectedCoupon] = useState(user ? user.coupons[0] : '');

    const calculateTotalOrderAmount = () => {
        if(checkedArr.length == 0 ){
            setTotalPrice(0);
        }else {
            const price = checkedArr.reduce((sum, currentValue) => {return sum + currentValue.price}, 0);
            setTotalPrice(price.toLocaleString());
        }
    }

    const onChangeSelectedCoupon = (e) => {
        const coupon = coupons.find(coupon => coupon.title === e.target.value)
        setSelectedCoupon(coupon);
    }

    const setTotalPaymentPrice = () => {
        if(checkedArr.length === 0) {
            setPaymentPrice(0);
            return;
        }

        const deliveryPrice = 3000;
        const nonCouponableItem = checkedArr.filter(item => !item.availableCoupon);
        const nonCouponableItemPrice = nonCouponableItem.reduce((sum, currentValue) => {return sum + currentValue.price}, 0);
        const couponableItem = checkedArr.filter(item => item.availableCoupon);
        const couponableItemPrice = couponableItem.reduce((sum, currentValue) => {return sum + currentValue.price}, 0);

        switch(selectedCoupon.type){
            case 'rate' : {
                const price =  (couponableItemPrice - (couponableItemPrice * (selectedCoupon.discountValue / 100))) + nonCouponableItemPrice + deliveryPrice;
                setPaymentPrice(price.toLocaleString());
                console.log('비율 계산 : ', price)
                break;
            }

            case 'amount' : {
                const price =  (couponableItemPrice - selectedCoupon.discountValue) + nonCouponableItemPrice + deliveryPrice;
                setPaymentPrice(price.toLocaleString());
                console.log('amount 계산 : ', price);

            }
        }
    }

    //console.log('user : ', shoppingCartItems)
    const changeAllCheck = async (e) => {
        if (e.target.checked) {
          setIsCheckAll(true);
          setCheckedArr(shoppingCartItems);
        } else {
          setIsCheckAll(false)
          setCheckedArr([])
        }
    }
    
      const checkingCheckedBox = (e, product) => {
        setIsCheckAll(false);
        setIsCheckingBox(true);
        
        if(checkedArr.find(arr => arr === product)){
            setCheckedArr(checkedArr.filter(arr => arr !== product))
        }else {
            setCheckedArr((preCheckedArr) => [...preCheckedArr, product]);
            console.log('checkingCheckedBox ', checkedArr)
        }
      }
    
      useEffect(() => {
        if (checkedArr.length !== 0 && checkedArr.length === shoppingCartItems.length) {
          setIsCheckAll(true)
        }
        console.log('** 변화 감지 ', checkedArr)
        calculateTotalOrderAmount();
        setTotalPaymentPrice();
      }, [checkedArr, selectedCoupon])
    
    
    return (
        <div>
            <div className={styles.shoppingCartWrapper}>
                <div className={styles.shoppingCartTitle}>01 SHOPPING BAG</div>
                <div className={styles.shoppingCartListWrapper}>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <input type='checkbox' onClick={ e => changeAllCheck(e)} checked={isCheckAll}/>
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
                                        <tr>
                                            <td>
                                                <input type='checkbox' onClick={e => checkingCheckedBox(e, product)}/>
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
                                    {tottalPrice} 원
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
                                <td>{totalPaymentPrice}원</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={styles.buttons}>
                    <div><Link to='/products'>CONTINUE SHOPPING</Link></div>
                    <div><button>CHECK OUT</button></div>
                </div>
            </div>
            
        </div>
    )
}