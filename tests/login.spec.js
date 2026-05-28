// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.describe('Login Function', () => {

    test('TC-001 : Input fields should display as the data that was filled', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        // check input fields are visible
        await expect(loginPage.usernameInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();

    });

    test('TC-002 : Should show an error message if log in without a username', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login('', 'secret_sauce');

        // check error message
        await expect(loginPage.errorMessage).toBeVisible();

        // check error message text
        await expect(loginPage.errorMessage)
            .toHaveText('Epic sadface: Username is required');

    });

    test('TC-003 : Should show an error message if log in without a password', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login('standard_user', '');

        // check error message
        await expect(loginPage.errorMessage).toBeVisible();

        // check error message text
        await expect(loginPage.errorMessage)
            .toHaveText('Epic sadface: Password is required');

    });

    test('TC-004 : Should show an error message if log in with both fields blank', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login('', '');

        // check error message
        await expect(loginPage.errorMessage).toBeVisible();

        // check error message text
        await expect(loginPage.errorMessage)
            .toHaveText('Epic sadface: Username is required');

    });

    test('TC-005 : Should logged in successfully with valid credentials', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );

        // login successfully
        await expect(page).toHaveURL(/inventory/);

    });

    test('TC-006 : Should logged in fails with an error message when using invalid credentials', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            'testt_user',
            'test_sauce'
        );

        // check error message
        await expect(loginPage.errorMessage).toBeVisible();

        // check error message text
        await expect(loginPage.errorMessage)
            .toHaveText(
                'Epic sadface: Username and password do not match any user in this service'
            );

    });

});