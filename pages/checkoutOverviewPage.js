import { HeaderComponent } from "../components/header/navbar/headerComponent";
import { ProductCardComponent } from "../components/product/productCardComponent";

export class CheckoutOverviewPage{

    constructor(page){
        this.page = page;
        this.headerComponent = new HeaderComponent(page);
        this.productCardComponent = new ProductCardComponent(page);

        this.itemTotalLocator  = page.locator('[data-test="subtotal-label"]');
        this.taxLocator = page.locator('[data-test="tax-label"]');
        this.grandTotalLocator = page.locator('[data-test="total-label"]');
    }

    async getNumberOfItemsInCart(){
        const cartNumberText = await this.headerComponent.cartNumber.textContent();
        return parseInt(cartNumberText,10);
    }

    async getProductInfo(index){
        return await this.productCardComponent.getProductInfoByIndex(index);
    }

    async getAllProductPrice(){
        const price =  await this.productCardComponent.getAllProductPrice();
        const productPrice = [];

        for(let i=0 ; i<price.length ; i++){
            productPrice[i] = parseFloat(price[i].replace('$',''));
        }

        return productPrice;

    }

    async calculateItemTotal(allProductPrice){

        let count = allProductPrice.length;
        let total = 0;

        for(let i = 0; i < count; i++){
            total = total+allProductPrice[i];
        }

        total = Number(total.toFixed(2));
        
        return total ;
    }

    async calculateGrandTotalPrice(allProductPrice){

        let count = allProductPrice.length;
        let total = 0;
        let tax = 8;

        for(let i = 0; i < count; i++){
            total = total+allProductPrice[i];
        }

        let grandTotal  = total + (total*tax)/100;
        grandTotal = Number(grandTotal.toFixed(2));
        
        return grandTotal;
    }

    async calculateTotalTax(allProductPrice){
        let count = allProductPrice.length;
        let total = 0;
        let tax = 8;

        for(let i = 0; i < count; i++){
            total = total+allProductPrice[i];
        }

        let totalTax = (total*tax)/100;
        totalTax = Number(totalTax.toFixed(2));
        return totalTax ;
    }

}