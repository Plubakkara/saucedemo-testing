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

    test('TC-015 : Should remove the selected item from the cart and update the cart badge' , async ({page}) =>{
        const productPage = new ProductPage(page);
        const headerComponent = new HeaderComponent(page);
        const cartPage = new CartPage(page);

        //add product to cart
        await productPage.addProductToCart(0);

        //go to cart page 
        await headerComponent.goToCart();

        //check item should be already in your cart.
        let countItem = await cartPage.getItemCount();
        expect(countItem).toEqual(1);

        //remove item
        await cartPage.removeItemFromCart(0);

        //verity item cart must be empty
        countItem = await cartPage.getItemCount()
        expect(countItem).toEqual(0);
        await expect(cartPage.cartNumber).toBeHidden();
    });

    test('TC-016 : When clicking "Continue Shopping", should navigates back to the product page',async ({page}) =>{
        const headerComponent = new HeaderComponent(page);
        const cartPage = new CartPage(page);

        //Go to cart page
        await headerComponent.goToCart();

        //Go back to product page with cotinue Shopping button
        await cartPage.continueShopping();

        //check URL
        await expect(page).toHaveURL(/inventory/);
        
    });

    test('TC-017 : When clicking "Checkout", should proceed to the checkout information page', async ({page}) =>{
        const headerComponent = new HeaderComponent(page);
        const cartPage = new CartPage(page);

        //go to cart page
        await headerComponent.goToCart();

        //go to checkout page
        await cartPage.checkout();

        await expect(page).toHaveURL(/checkout-step-one/);
    })
});