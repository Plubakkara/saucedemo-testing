import { LoginPage } from "../pages/loginPage";

export async function loginAsStandardUser(page) {

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user','secret_sauce');
}