class InventoryPage{

    constructor(page){
        this.page = page;
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.itemPrices = page.locator('.inventory-item-price');

    }

    getProductCard(productName){
        return this.inventoryItems.filter({hasText : productName});

    }

    async addProductToCart(productName){
        const product = this.getProductCard(productName);
        await product.getByRole('button', {name: 'add-to-cart-sauce-labs-backpack'});

    }

    async getCartCount (){
        const hasBadge = await this.cartBadge.count();
        if(hasBadge== 0){
            return 0;
        }
        return parseInt(this.cartBadge.textContent(), 10);

    }

    async sortBy(optionValue){
        await this.sortDropdown.selectOption(optionValue); //this select lohi

    }

    async getAllProductPrices(){
        const priceTexts = await this.itemPrices.allTextContents();
        return  priceTexts.map((p=> parseFloat(p.replace('$', ''))));
        
    }

}

module.exports={InventoryPage}