import styles from '../css/products-page.module.css';
import {productSortList} from '../constants/Product';
import { Product } from '../modules/Product';
import {useState} from 'react';
import {Pagination} from '../modules/Pagination';

export const ProductPage = ({products}) => {
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    //console.log('products ', products)    

    return (
        <div>
            <div className={styles.productWrapper}>
                <div className={styles.productSort}>
                    <select>
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
                        products.slice(offset, offset + limit).map(product => {
                            return (
                                <Product product={product}></Product>
                            )
                        })
                    }
                    <footer>
                        <Pagination total={products.length} limit={limit} page={page} setPage={setPage}></Pagination>
                    </footer>
                </div>

            </div>
        </div>
    )
}