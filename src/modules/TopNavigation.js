
import styles from '../css/top-navigation.module.css';
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

export const TopNavigation = () => {
    const cartItemCount = useSelector((state) => state.cartItemCount);

    return (
        <div>
            <header>
                <div className={styles.headerTop}></div>
                <div className={styles.headerNavigationWrapper}>
                    <div></div>
                    <div></div>
                    <div>
                        <ul className={styles.navigationRight}>
                            <li>
                                <span><Link to='/cart'>Shopping Cart</Link></span>
                                
                            </li>
                            <li className={styles.shoppingCartIcon}>
                                <Link to='/cart'>
                                    <FontAwesomeIcon icon={faCartShopping} className={styles.shoppingCartIcon}/>
                                    <span>{cartItemCount}</span>
                                </Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </header>

        </div>
    )
}