import { Coupon } from "./Coupon";
import { ShoppingCart } from "./ShoppingCart";

export class User {
    constructor(name, coupons, shoppingCart){
        this.name = name;
        this.coupons = coupons;
        this.shoppingCart = shoppingCart;
    }
}