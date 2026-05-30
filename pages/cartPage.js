import { ProductCardComponent } from "../components/product/productCardComponent";
import { HeaderComponent } from "../components/header/navbar/headerComponent";

export class CartPage {

    constructor(page){
        this.page = page;
        this.cartNumber = page.locator('[data-test="shopping-cart-badge"]');
        this.productCard = new ProductCardComponent(page);
        this.removeItemLocator = page.locator('[data-test^="remove"]');
        this.continueShoppingLocator = page.locator('[data-test="continue-shopping"]');
        this.checkoutLocator = page.locator('[data-test="checkout"]');
        this.headerComponent = new HeaderComponent(page);
    }

    // Get number of items in cart
    async getNumberOfItemsInCart(){
        const cartNumberText = await this.headerComponent.cartNumber.textContent();
        return parseInt(cartNumberText,10);
    }

    // Get cart product info
    async getCartProductInfo(index){
        return await this.productCard.getProductInfoByIndex(index);
    }

    // Remove Item from cart
    async removeItemFromCart(index){
        await this.removeItemLocator.nth(index).click();;
    }

    //check item should be already in your cart.
    async getItemCount(){
        return await this.productCard.productName.count();
    }

    //continue shopping
    async continueShopping(){
        await this.continueShoppingLocator.click();
    }

    //checkout
    async checkout(){
        await this.checkoutLocator.click();
    }

}