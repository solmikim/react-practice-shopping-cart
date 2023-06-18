export class Product{
    constructor(no, name, imageUrl, price, score, availableCoupon = true){
        this.no = no;
        this.name = name;
        this.imageUrl = imageUrl;
        this.price = price;
        this.score = score;
        this.availableCoupon = availableCoupon
    }

    getPrice(){
        return this.price.toLocaleString();
    }

    isSelectedShoppingCart(selectedProducts){
        if(selectedProducts.length == 0 ) return false;

        return selectedProducts.some((product)=> product === this);
    }
}