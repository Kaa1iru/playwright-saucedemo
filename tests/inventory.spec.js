import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

let inventoryPage;

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.inputCredentials("standard_user", "secret_sauce");
    await loginPage.login();
    await expect(page).toHaveURL(/inventory\.html/);
    inventoryPage = new InventoryPage(page);
});

test("can sort by name (A to Z)", async() => {
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.getItemNames();
    await expect(names).toEqual([...names].sort((a,b) => a.localeCompare(b))); 
});

test("can sort by name (Z to A)", async() => {
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.getItemNames();
    await expect(names).toEqual([...names].sort((a,b) => b.localeCompare(a)));
});

test("can sort by price (ascending)", async() => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getItemPrices();
    await expect(prices).toEqual([...prices].sort((a,b) => a-b));
});

test("can sort by price (descending)", async() => {
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getItemPrices();
    await expect(prices).toEqual([...prices].sort((a,b) => b-a));
});