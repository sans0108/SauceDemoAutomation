class Cart {

    constructor(page) {
        this.cartLink = page.locator('[data-test="shopping_cart_link"]');
        this.itemNames = page.locator('[data-test="inventory-item-name"]');
        this.cartItem = page.locator('[data-test="inventory-item-name"]');
        this.checkoutButton = page.getByRole('button', { name: 'checkout' });
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput =page.getByPlaceholder('Last Name');
        this.zipInput =page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('input',{name :'continue'});
        this.subTotal =page.locator('[data-test="subtotal-label"]');
        this.tax =page.locator('[data-test="tax-label"]');
        this.totalPrice = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.getCompleteHeaderButton =page.locator('data-test="complete-header"');
    }

    async goToCart() {
        this.cartLink.click();
    }

    async getAllCartNames() {
        return await this.itemNames.allTextContents();

    }

    getCartItems(productName) {
        return this.cartItem.filter({ hasText: productName });

    }

    async removeItems(productName) {
        const item = this.getCartItems(productName);
        await item.getByRole('button', { name: 'Remove' }).click();

    }

    async getCartItemCount() {
        return this.cartItem.count();
    }

    async clickOnCheckout() {
        await this.checkoutButton.click();
    }

    async fillInformation(firstName, LastName, Zip){
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(this.lastNameInput);
        await this.zipInput.fill(this.zipInput);

    }

    async clickOnContinueButton(){
        await this.continueButton.click();
    }

    async getSubTotal(){
        const text = await this.subTotal.textContent();
        return parseFloat(text.replace('Item total: $',''));
        

    }

    async getTax(){
        const text= await this.tax.textContent();
        return parseFloat(text.replace('Tax: $', ''));
    }

    async getTotal(){
        const text = await this.totalPrice.textContent();
        return parseFloat('Total: $', '');
    }

    async clickOnFinishButton(){
        await this.finishButton().click();
    }

   
}

module.exports = { Cart }