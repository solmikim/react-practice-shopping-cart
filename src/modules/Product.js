import styles from '../css/product.module.css';

export const Product = ({product}) => { // 내림차순으로 헤야함
    return (
        <div>
            <div class={styles.productWrapper}>
                <div class={styles.productImage}><img src={product.imageUrl}/></div>
                <div class={styles.productName}>{product.name}</div>
                <div class={styles.productPrice}>{product.getPrice()}원</div>
                <div class={styles.shoppingCart}>
                    <button>장바구니 담기</button>
                </div>
            </div>
        </div>
    )
}