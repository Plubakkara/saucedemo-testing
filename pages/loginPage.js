import { expect } from "playwright/test";

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('[id="user-name"]');
        this.passwordInput = page.locator('[id="password"]');
        this.loginButton = page.locator('[id="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    // Go to login page
    async goto(){
        await this.page.goto('https://www.saucedemo.com/');
    }

    //Login
    async login(username , password){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    //Get error message
    async getErrorMessage(){
        return await this.errorMessage.textContent();
    }

}
