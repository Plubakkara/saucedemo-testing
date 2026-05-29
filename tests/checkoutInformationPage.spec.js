import { test , expect } from "playwright/test";
import { loginAsStandardUser } from "../utils/loginHelper";
import { HeaderComponent } from "../components/header/navbar/headerComponent";
import { CartPage } from "../pages/cartPage";
import { CheckoutInformationPage } from "../pages/checkoutInformationPage";

test.describe('Checkout Information Page', () => {

    test.beforeEach(async({page}) =>{

        await loginAsStandardUser(page);

    });

    test('TC-018 : When clicking "Cancel", should navigate back to the cart page' , async ({page})=>{
       
        const headerComponent = new HeaderComponent(page);
        const cartPage = new CartPage(page);
        const checkoutInformationPage = new CheckoutInformationPage(page);

        //go to cart page
        await headerComponent.goToCart();

        //go to checkout page
        await cartPage.checkout();
        await expect(page).toHaveURL(/checkout-step-one/);
       
        //Cancel
        await checkoutInformationPage.cancelCheckout();
        await expect(page).toHaveURL(/cart/);
    })

    test.only('TC-019 : When clicking "Continue" without any client information, should display an error message' , async ({page})=>{
       
        const headerComponent = new HeaderComponent(page);
        const cartPage = new CartPage(page);
        const checkoutInformationPage = new CheckoutInformationPage(page);

        //go to cart page
        await headerComponent.goToCart();

        //go to checkout page
        await cartPage.checkout();
        await expect(page).toHaveURL(/checkout-step-one/);

        //fill checkout form
        await checkoutInformationPage.submitCheckoutInformation('','','');

        //expect error
        await expect(checkoutInformationPage.errorMessage).toBeVisible();
    });

 });