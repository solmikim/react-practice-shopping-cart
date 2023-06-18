import styles from '../css/products-page.module.css';
import { productSortList, sortListInternalValue } from '../constants/Product';
import { Product } from '../modules/Product';
import { useEffect, useState } from 'react';
import { Pagination } from '../modules/Pagination';

export const ProductPage = ({products}) => {
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    const [sortedKey, setSortedKey] = useState(sortListInternalValue.SCORE);
    const [productItems, setProductItems] = useState([]);

    const onChangeSortProducts = (e) => {
        setSortedKey(e.target.value);
    }

    const sortProducts = () => {
        switch(sortedKey){
            case sortListInternalValue.SCORE: {
                setProductItems(products.sort(function (productA, productB) {
                    return productA.score - productB.score;
                  }))

                break;
            }
        }
    }

    useEffect(()=>{
        sortProducts();
    }, [sortedKey, productItems])

    return (
        <div>
            <div className={styles.productWrapper}>
                <div className={styles.productSort}>
                    <select onChange={onChangeSortProducts} value={sortedKey}>
                    {
                        productSortList.map(product => {
                            return ( 
                                 <option key={product.internalValue} value={product.internalValue}>{product.displayName}</option>
                            )
                        })
                    }
                    </select>
                </div>
                <div className={styles.products}>
                    {
                        productItems.slice(offset, offset + limit).map(product => {
                            return (
                                <Product product={product} key={product.no}></Product>
                            )
                        })
                    }
                    <footer>
                        <Pagination total={productItems.length} limit={limit} page={page} setPage={setPage}></Pagination>
                    </footer>
                </div>

            </div>
        </div>
    )
}