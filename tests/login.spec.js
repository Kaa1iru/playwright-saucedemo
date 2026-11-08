import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

let loginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
});

test("can log in (standard user)", async ({ page }) => {
    await loginPage.inputCredentials("standard_user", "secret_sauce");
    await loginPage.login();
    await expect(page).toHaveURL(/inventory\.html/);
});

test("can log out", async ({ page }) => {
    await loginPage.inputCredentials("standard_user", "secret_sauce");
    await loginPage.login();
    await expect(page).toHaveURL(/inventory\.html/);

    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
});

test("shows error for wrong credentials", async () => {
    await loginPage.inputCredentials("wrong_user", "wrong_password");
    await loginPage.login();
    await expect(loginPage.errorMessage).toContainText(
        "Username and password do not match any user in this service"
    );
});

test("shows error for empty username", async () => {
    await loginPage.inputCredentials("", "secret_sauce");
    await loginPage.login();
    await expect(loginPage.errorMessage).toContainText("Username is required");
});

test("shows error for empty password", async () => {
    await loginPage.inputCredentials("standard_user", "");
    await loginPage.login();
    await expect(loginPage.errorMessage).toContainText("Password is required");
});

test("shows error for empty credentials", async () => {
    await loginPage.inputCredentials("", "");
    await loginPage.login();
    await expect(loginPage.errorMessage).toContainText("Username is required");
});

test("shows error for locked out user", async() => {
    await loginPage.inputCredentials("locked_out_user", "secret_sauce");
    await loginPage.login();
    await expect(loginPage.errorMessage).toContainText("this user has been locked out");
});

test("can log in (problem user)", async({ page }) => {
    await loginPage.inputCredentials("problem_user", "secret_sauce");
    await loginPage.login();
    await expect(page).toHaveURL(/inventory\.html/);
});

test("can log in (performance glitch user)", async({ page }) => {
    await loginPage.inputCredentials("performance_glitch_user", "secret_sauce");
    await loginPage.login();
    await expect(page).toHaveURL(/inventory\.html/);
});

test("can log in (error user)", async({ page }) => {
    await loginPage.inputCredentials("error_user", "secret_sauce");
    await loginPage.login();
    await expect(page).toHaveURL(/inventory\.html/);
});

test("can log in (visual user)", async({ page }) => {
    await loginPage.inputCredentials("visual_user", "secret_sauce");
    await loginPage.login();
    await expect(page).toHaveURL(/inventory\.html/);
});