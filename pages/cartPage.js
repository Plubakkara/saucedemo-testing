import { ProductCardComponent } from "../components/product/productCardComponent";


export class CartPage {
    constructor(page){
        this.page = page;
        this.cartNumber = page.locator('[data-test="shopping-cart-badge"]');
        this.productCard = new ProductCardComponent(page);
    }

    //Get number of items in cart
    async getNumberOfItemsInCart(){
        const cartNumberText = await this.cartNumber.textContent();
        return parseInt(cartNumberText);
    }

    //// Get cart product info
    async getCartProductInfo(index){
        return await this.productCard.getProductInfoByIndex(index);
    }
}