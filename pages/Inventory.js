class InventoryPage{

    constructor(page){
        this.page = page;
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-link"]');
        this.cartCount =page.locator('[data-test="shopping-cart-badge"]')
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.itemPrices = page.locator('[data-test="inventory-item-price"]');

    }

    getProductCard(productName){
        return this.inventoryItems.filter({hasText : productName});

    }

    async addProductToCart(productName){
        const product = this.getProductCard(productName);
        await product.getByRole('button', {name: 'Add to cart'}).click();

    }

    async getCartCount (){
        const hasBadge = await this.cartCount.count();
        if(hasBadge== 0){
            return 0;
        }
        return  parseInt( await this.cartCount.textContent(), 10);

    }

    async sortBy(optionValue){
        await this.sortDropdown.selectOption(optionValue); //this select lohi

    }

    async getAllProductPrices(){
        const priceTexts = await this.itemPrices.allTextContents();
        return  priceTexts.map((p=> parseFloat(p.replace('$', ''))));
        
    }

    async clickOnShoppingCart(){
        await this.cartBadge.click();
    }

}

module.exports={InventoryPage}