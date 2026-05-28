import { expect } from "playwright/test";
import { LoginPage } from "./loginPage";
import { ProductCardComponent } from "../components/product/productCardComponent";

export class ProductPage {
    constructor(page) {
        this.page = page;
        this.addToCartButton = page.locator('[data-test^="add-to-cart"]');
        this.removeFromCartButton = page.locator('[data-test^="remove"]');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.productCard = new ProductCardComponent(page);
    }

    //Add product to cart
    async addAllProductToCart(){
        const count = await this.addToCartButton.count();
        for(let i = 0; i < count; i++){
            await this.addToCartButton.nth(0).click();
        }
        return count;
    }

    //Remove product from cart
    async removeAllProductFromCart(){
        const count = await this.removeFromCartButton.count();
        for(let i = 0; i < count; i++){
            await this.removeFromCartButton.nth(0).click();
        }
    }

    //Sort products A to Z
    async sortProductsAToZ(){
        await this.sortDropdown.selectOption('az');
    }
    
    //Sort products Z to A
    async sortProductsZToA(){
        await this.sortDropdown.selectOption('za');
    }

    //Sort products low to high
    async sortProductsLowToHigh(){
        await this.sortDropdown.selectOption('lohi');
    }

    //Sort products high to low
    async sortProductsHighToLow(){
        await this.sortDropdown.selectOption('hilo');
    }

    //Add product to cart by index
    async addProductToCart(index){
        await this.addToCartButton.nth(index).click();
    }

    // Get product info by index
    async getProductInfo(index){
        return await this.productCard.getProductInfoByIndex(index);
    }
}