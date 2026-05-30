import { test , expect } from "playwright/test";
import { loginAsStandardUser } from "../utils/loginHelper";
import { HeaderComponent } from "../components/header/navbar/headerComponent";
import { CartPage } from "../pages/cartPage";
import { ProductPage } from "../pages/productPage";
import { CheckoutOverviewPage } from "../pages/checkoutOverviewPage";
import { CheckoutInformationPage } from "../pages/checkoutInformationPage";

test.describe('Checkout Overview Page', () => {

    test.beforeEach(async({page}) =>{

        await loginAsStandardUser(page);

    });

    test('TC-022 : The cart badge should displays the correct number of items currently in the cart' , async ({page})=>{
        const headerComponent = new HeaderComponent(page);
        const cartPage = new CartPage(page);
        const checkOverviewPage = new CheckoutOverviewPage(page);
        const productPage = new ProductPage(page);
        const checkoutInformationPage = new CheckoutInformationPage(page);

        //add product to cart
        const countProduct = await productPage.addAllProductToCart();

        //go to cart page
        await headerComponent.goToCart();

        //go to checkout page
        await cartPage.checkout();

        //fill checkout form
        await checkoutInformationPage.submitCheckoutInformation('Emily','Harrison','90210');

        //get number of Item in cart
        const cartPageCount = await checkOverviewPage.getNumberOfItemsInCart();

        //expect correct number of item
        expect(cartPageCount).toEqual(countProduct);
        
    })

    test('TC-023 : The item name and price in the cart should match the selection from the product page' , async ({page})=>{
        const headerComponent = new HeaderComponent(page);
        const cartPage = new CartPage(page);
        const productPage = new ProductPage(page);
        const checkoutInformationPage = new CheckoutInformationPage(page);
        const checkoutOverviewPage = new CheckoutOverviewPage(page);

        //add product to cart
        await productPage.addProductToCart(0);

        //get product information
        const productPageInfo = await productPage.getProductInfo(0);
        

        //go to cart page
        await headerComponent.goToCart();

        //go to checkout page
        await cartPage.checkout();

        //fill checkout form
        await checkoutInformationPage.submitCheckoutInformation('Emily','Harrison','90210');

        //get information in overview page
        const cartOverviewPageInfo = await checkoutOverviewPage.getProductInfo(0);

        //check name and price math
        expect(cartOverviewPageInfo).toEqual(productPageInfo);
        
    })

    test('TC-024 : Should correctly calculate the total, tax, and grand total' , async ({page})=>{
        const headerComponent = new HeaderComponent(page);
        const cartPage = new CartPage(page);
        const productPage = new ProductPage(page);
        const checkoutInformationPage = new CheckoutInformationPage(page);
        const checkoutOverviewPage = new CheckoutOverviewPage(page);

        //add product to cart
        await productPage.addAllProductToCart();

        //get product price
        const allProductPrice = await checkoutOverviewPage.getAllProductPrice();

        //go to cart page
        await headerComponent.goToCart();

        //go to checkout page
        await cartPage.checkout();

        //fill checkout form
        await checkoutInformationPage.submitCheckoutInformation('Emily','Harrison','90210');

        //get total price and tax
        const totalPrice = await checkoutOverviewPage.calculateItemTotal(allProductPrice);
        const totalTax = await checkoutOverviewPage.calculateTotalTax(allProductPrice);
        const grandTotalPrice = await checkoutOverviewPage.calculateGrandTotalPrice(allProductPrice);
        

        //get expect information from overview page
        const expectTotal = parseFloat((
            await checkoutOverviewPage.itemTotalLocator 
            .textContent())
            .replace("Item total: $",""));

        const expectTotalTax = parseFloat((
            await checkoutOverviewPage.taxLocator
            .textContent())
            .replace("Tax: $",""));

        const expectGrandTotalPrice = parseFloat((
            await checkoutOverviewPage.grandTotalLocator
            .textContent())
            .replace("Total: $", ""));

        //check correctly calculate
        expect(totalPrice).toEqual(expectTotal);
        expect(totalTax).toEqual(expectTotalTax);
        expect(grandTotalPrice).toEqual(expectGrandTotalPrice);
        
    });

 });