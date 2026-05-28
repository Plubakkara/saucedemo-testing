export class ProductCardComponent {
    constructor(page) {
        this.page = page;
        this.productName = page.locator('[data-test="inventory-item-name"]');
        this.productPrice = page.locator('[data-test="inventory-item-price"]');
    }

    //get All product names
    async getAllProductNames(){
        const count = await this.productName.count();
        const productNames = [];
        for(let i = 0; i < count; i++){
            productNames[i] = await this.productName.nth(i).textContent();
        }
        return productNames;
    }

    //get All product price
    async getAllProductPrice(){
        const count = await this.productPrice.count();
        const productPrice = [];
        for(let i=0 ; i<count ; i++){
            productPrice[i] = await this.productPrice.nth(i).textContent();
        }
        return productPrice;
    }

    //get product name by index
    async getProductNameByIndex(index){
        return await this.productName.nth(index).textContent();
    }
    
    //get product price by index
    async getProductPriceByIndex(index){
        return await this.productPrice.nth(index).textContent();
    }
    //get information of product by index
    async getProductInfoByIndex(index){
        const name = await this.productName.nth(index).textContent();
        const price = await this.productPrice.nth(index).textContent();
        return {name, price};
    }

}
