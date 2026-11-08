import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';

let cartPage;

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.inputCredentials("standard_user", "secret_sauce");
    await loginPage.login();
    await expect(page).toHaveURL(/inventory\.html/);
    cartPage = new CartPage(page);
});

test("cart contains added items", async({ page }) => {
    await cartPage.addToCart('Sauce Labs Backpack');
    await cartPage.addToCart('Sauce Labs Bike Light');

    await cartPage.openCart();
    await expect(page).toHaveURL(/cart\.html/);
    
    await expect(cartPage.itemsInCart).toContainText([
        "Sauce Labs Backpack",
        "Sauce Labs Bike Light"
    ]);
});

test("can remove item from cart (inventory page)", async({ page }) => {
    await cartPage.addToCart('Sauce Labs Backpack');
    await cartPage.removeFromInventoryPage('Sauce Labs Backpack');

    await cartPage.openCart();
    await expect(page).toHaveURL(/cart\.html/);

    await expect(cartPage.itemsInCart).toHaveCount(0);
});

test("can remove item from cart (cart page)", async({ page }) => {
    await cartPage.addToCart('Sauce Labs Backpack');

    await cartPage.openCart();
    await expect(page).toHaveURL(/cart\.html/);
    
    await cartPage.removeFromCartPage('Sauce Labs Backpack');
    await expect(cartPage.itemsInCart).toHaveCount(0);
});

test("cart badge icon reflects item quantity", async({ page }) => {
    await cartPage.addToCart('Sauce Labs Backpack');
    await cartPage.cartBadgeQuantity(1);
    await cartPage.addToCart('Sauce Labs Bike Light');
    await cartPage.cartBadgeQuantity(2);
    await cartPage.removeFromInventoryPage('Sauce Labs Bike Light');
    await cartPage.cartBadgeQuantity(1);
});