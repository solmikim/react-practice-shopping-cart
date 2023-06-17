import styles from '../css/top-navigation.module.css';
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TopNavigation = () => {
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
                                <span>Shopping Cart</span>
                                <FontAwesomeIcon icon={faCartShopping} className={styles.shoppingCartIcon}/>
                            </li>
                        </ul>

                    </div>
                </div>
            </header>

        </div>
    )
}