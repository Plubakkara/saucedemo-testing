// @ts-check
import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/productPage';
import { loginAsStandardUser } from '../utils/loginHelper';
import { HeaderComponent } from '../components/header/navbar/headerComponent';
import { CartPage } from '../pages/cartPage';

test.describe('Cart Function', () =>{

    test.beforeEach(async({page})=>{

        await loginAsStandardUser(page);
        
    });

    test('TC-013 : The cart badge should displays the correct number of items currently in the cart', async ({page}) =>{
        const productPage = new ProductPage(page);
        const headerComponent = new HeaderComponent(page);
        const cartPage = new CartPage(page);

        //add all products to cart
        const expectCount = await productPage.addAllProductToCart();
        
        await headerComponent.goToCart();

        //check product count in cart badge
        const count = await cartPage.getNumberOfItemsInCart();
        expect(count).toEqual(expectCount);

    });

    test('TC-014 : The item name and price in the cart should match the selection from the product page', async ({page}) =>{
        const productPage = new ProductPage(page);
        const headerComponent = new HeaderComponent(page);
        const cartPage = new CartPage(page);

        //add product to cart
        await productPage.addProductToCart(0);

        //get product name and price from product page
        const expectProductInfo = await productPage.getProductInfo(0);

        await headerComponent.goToCart();
        //get product name and price from cart page
        const productInfo = await cartPage.getCartProductInfo(0);
        
        //expect product name and price in cart to match product page
        expect(productInfo).toEqual(expectProductInfo);

    });
});