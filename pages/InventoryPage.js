export class InventoryPage{
    constructor(page){
        this.page = page;

        this.sortDropdown = page.locator('.product_sort_container');
        this.itemName = page.locator('.inventory_item_name');
        this.itemPrice = page.locator('.inventory_item_price');
    }

    async sortBy(option){
        await this.sortDropdown.selectOption(option);
    }

    async getItemNames(){
        return await this.itemName.allTextContents();
    }

    async getItemPrices(){
        const texts = await this.itemPrice.allTextContents();
        return texts.map(text => Number(text.replace('$', '').trim()));
    }
}