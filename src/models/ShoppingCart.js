export class ShoppingCart{
    constructor(selectedProducts = []){
        this.selectedProducts = selectedProducts;
    }

    getCartItemCount(){
        return this.selectedProducts.length;
    }

    hasShoppingBag(item){
        return this.selectedProducts.find((product) => product === item);
    }
}