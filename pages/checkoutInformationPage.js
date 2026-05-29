
export class CheckoutInformationPage {
    constructor(page){
        this.page = page;
        this.cancelLocator = page.locator('[data-test="cancel"]');
        this.continueLocator = page.locator('[data-test="continue"]');

        this.fistNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.zipInput = page.locator('[data-test="postalCode"]');

        this.errorMessage = page.locator('[data-test="error"]');
    }

    async cancelCheckout(){
        await this.cancelLocator.click();
    }

    async submitCheckoutInformation(firstName , lastName , zip){
        await this.fistNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipInput.fill(zip);
        await this.continueLocator.click();
    }

}