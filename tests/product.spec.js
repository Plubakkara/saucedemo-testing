// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductPage } from '../pages/productPage';
import { loginAsStandardUser } from '../utils/loginHelper';
import { HeaderComponent } from '../components/header/navbar/headerComponent';
import { ProductCardComponent } from '../components/product/productCardComponent';

test.describe('Product Function', () =>{

    test.beforeEach(async({page})=>{

        await loginAsStandardUser(page);

    });
    test('TC-007 : Adding all available products to the cart and then removing them, verifying that the cart updates correctly',async ({page}) =>{
        
        const productPage = new ProductPage(page);
        const productCardComponent = new ProductCardComponent(page);
        await productPage.addAllProductToCart();
        await expect(productPage.addToCartButton).toHaveCount(0);
        
        await productPage.removeAllProductFromCart();
        await expect(productPage.removeFromCartButton).toHaveCount(0);

    });

    test('TC-008 : Product should correctly sorts items from A to Z' , async ({page}) =>{
        const productPage = new ProductPage(page);
        const productCardComponent = new ProductCardComponent(page);
        await productPage.sortProductsAToZ();

        //get all product names
        const productNames = await productCardComponent.getAllProductNames();

        //expect product names to be sorted from A to Z
        const expectedName = [...productNames].sort();
        expect(productNames).toEqual(expectedName);

    })

    test('TC-009 : Product should correctly sorts items from Z to A' , async ({page}) =>{
        const productPage = new ProductPage(page);
        const productCardComponent = new ProductCardComponent(page);
        await productPage.sortProductsZToA();

        //get all product names
        const productNames = await productCardComponent.getAllProductNames();

        //expect product names to be sorted from Z to A
        const expectedName = [...productNames].sort().reverse();
        expect(productNames).toEqual(expectedName);

    })

    test('TC-010 : Product should correctly sorts items from price low to high', async ({page})=>{
        const productPage = new ProductPage(page);
        await productPage.sortProductsLowToHigh();
        const productCardComponent = new ProductCardComponent(page);

        //get all price
        const productPrice = await productCardComponent.getAllProductPrice();

        //convert price string to number
        for(let i=0 ; i<productPrice.length ; i++){
            productPrice[i] = parseFloat(productPrice[i].replace('$',''));
        }

        //expect product price to be sorted from low to high
        const expectedPrice = [...productPrice].sort((a,b)=>a-b);
        expect(productPrice).toEqual(expectedPrice);
        
    });

    test('TC-011 : Product should correctly sorts items from price high to low',async({page})=>{
        const productPage = new ProductPage(page);
        const productCardComponent = new ProductCardComponent(page);
        await productPage.sortProductsHighToLow();

        //get all price
        const productPrice = await productCardComponent.getAllProductPrice();

        //convert price string to number
                //convert price string to number
        for(let i=0 ; i<productPrice.length ; i++){
            productPrice[i] = parseFloat(productPrice[i].replace('$',''));
        }

        //expect product price to be sorted from high to low
        const expectedPrice = [...productPrice].sort((a,b) => b-a);
        expect(productPrice).toEqual(expectedPrice);

    });

    test('TC-012 : Should navigate to the cart page when clicking the cart icon', async ({page}) =>{
        const productPage = new ProductPage(page);
        const headerComponent = new HeaderComponent(page);
        //click cart button
        await headerComponent.goToCart();
        //expect to navigate to cart page
        await expect(page).toHaveURL(/cart/);
    });
})
