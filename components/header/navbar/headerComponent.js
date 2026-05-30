export class HeaderComponent {
    constructor(page) {
        this.page = page;
        this.cartButton = page.locator('[data-test="shopping-cart-link"]');
        this.cartNumber = page.locator('[data-test="shopping-cart-badge"]');
    }

    async goToCart() {
        await this.cartButton.click();
    }
}