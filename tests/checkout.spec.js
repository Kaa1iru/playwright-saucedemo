import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

let checkoutPage, cartPage;

test.beforeEach(async ({ page }) =>{
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.inputCredentials("standard_user", "secret_sauce");
    await loginPage.login();
    await expect(page).toHaveURL(/inventory\.html/);
    cartPage = new CartPage(page);
    await cartPage.addToCart('Sauce Labs Backpack')
    await cartPage.openCart();
    await expect(page).toHaveURL(/cart\.html/);
    checkoutPage = new CheckoutPage(page);
});

test("can checkout", async({ page }) => {
    await checkoutPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await checkoutPage.inputInfo('John', 'Doe', '12345');
    
    await checkoutPage.proceedToOverview();
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(cartPage.itemsInCart).toContainText(['Sauce Labs Backpack']);
    
    await checkoutPage.completeCheckout();
    await expect(page).toHaveURL(/checkout-complete\.html/);
});

test("shows error for empty information", async({ page }) => {
    await checkoutPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await checkoutPage.inputInfo('', '', '');
    
    await checkoutPage.proceedToOverview();
    await expect(checkoutPage.errorMessage).toContainText("First Name is required");
});

test("shows error for empty first name", async({ page }) => {
    await checkoutPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await checkoutPage.inputInfo('', 'Doe', '12345');
    
    await checkoutPage.proceedToOverview(); 
    await expect(checkoutPage.errorMessage).toContainText("First Name is required");
});

test("shows error for empty last name", async({ page }) => {
    await checkoutPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await checkoutPage.inputInfo('John', '', '12345');
    
    await checkoutPage.proceedToOverview();
    await expect(checkoutPage.errorMessage).toContainText("Last Name is required");
});

test("shows error for empty zip/postal code", async({ page }) => {
    await checkoutPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await checkoutPage.inputInfo('John', 'Doe', '');
    
    await checkoutPage.proceedToOverview();
    await expect(checkoutPage.errorMessage).toContainText("Postal Code is required");
});

test("shows correct summary info", async({ page }) => {
    await checkoutPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await checkoutPage.inputInfo('John', 'Doe', '12345');
    
    await checkoutPage.proceedToOverview();
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    
    const price = await checkoutPage.getItemPrices();
    const subtotal = await checkoutPage.getSubtotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();

    const totalItemCost = price.reduce((sum, item) => sum + item, 0);
    const computedTax = totalItemCost * 0.08;
    const finalPrice = totalItemCost + computedTax;

    expect(subtotal).toBeCloseTo(totalItemCost, 2);
    expect(tax).toBeCloseTo(computedTax, 2);
    expect(total).toBeCloseTo(finalPrice, 2);
});
