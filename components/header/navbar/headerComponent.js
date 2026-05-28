export class HeaderComponent {
    constructor(page) {
        this.page = page;
        this.cartButton = page.locator('[data-test="shopping-cart-link"]');
    }

    async goToCart() {
        await this.cartButton.click();
    }
}