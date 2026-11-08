import { expect } from "@playwright/test";

export class CheckoutPage{
    constructor(page){
        this.page = page;

        this.checkout = page.getByRole('button', { name: 'Checkout' });
        this.continue = page.getByRole('button', { name: 'Continue' });
        this.finish = page.getByRole('button', { name: 'Finish' });

        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.zipCode = page.getByPlaceholder('Zip/Postal Code');
        this.errorMessage = page.getByText('Error');

        this.itemPrice = page.locator('.inventory_item_price');
        this.subtotalLabel = page.locator('.summary_subtotal_label');
        this.taxLabel = page.locator('.summary_tax_label');
        this.totalLabel = page.locator('.summary_total_label');
    }

    async proceedToCheckout(){
        await this.checkout.click();
    }

    async proceedToOverview(){
        await this.continue.click();
    }

    async completeCheckout(){
        await this.finish.click();
    }

    async inputInfo(FirstName, LastName, ZipCode){
        await expect(async () => {
            await this.firstName.fill(FirstName);
            await expect(this.firstName).toHaveValue(FirstName);
        }).toPass();
        await this.lastName.fill(LastName);
        await this.zipCode.fill(ZipCode);
    }

    priceParser(text){
        return parseFloat(text.replace(/[^0-9.]/g, ''));
    }

    async getItemPrices(){
        await this.itemPrice.first().waitFor();
        const texts = await this.itemPrice.allTextContents();
        return texts.map(text => this.priceParser(text));
    }

    async getSubtotal(){
        return this.priceParser(await this.subtotalLabel.textContent());
    }

    async getTax(){
        return this.priceParser(await this.taxLabel.textContent());
    }

    async getTotal(){
        return this.priceParser(await this.totalLabel.textContent());
    }
}