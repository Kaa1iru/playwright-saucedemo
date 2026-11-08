import { expect } from "@playwright/test";

export class CartPage {
    constructor(page){
        this.page = page;

        this.cart = page.locator('.shopping_cart_link');
        this.badge = page.locator('.shopping_cart_badge');
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.removeButton = page.getByRole('button', { name: 'Remove' });
        this.itemsInCart = page.locator('.cart_item');
    }

    async addToCart(itemName){
        const itemToAdd = this.page.locator('.inventory_item', { hasText: itemName });
        await itemToAdd.locator(this.addToCartButton).click();
    }

    async removeFromInventoryPage(itemName){
        const itemToRemove = this.page.locator('.inventory_item', { hasText: itemName });
        await itemToRemove.locator(this.removeButton).click();
    }

    async removeFromCartPage(itemName){
        const itemToRemove = this.itemsInCart.filter({ hasText: itemName });
        await itemToRemove.locator(this.removeButton).click();
    }

    async openCart(){
        await this.cart.click();
    }

    async cartBadgeQuantity(qty){
        await expect(this.badge).toHaveText(String(qty));
    }
}