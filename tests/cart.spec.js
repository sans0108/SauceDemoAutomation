const { test, expect } = require('@playwright/test');
const { LoginTest, LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/Inventory');
const constants = require('../data/constants');
const users = require('../data/users');
const { Cart } = require('../pages/CartPage');

/** @type {LoginPage} */
let loginPage;

/** @type {InventoryPage} */
let inventory;

/** @type {Cart} */
let cart;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventory = new InventoryPage(page);
    cart = new Cart(page);
    await loginPage.open();


})

test('added products appear correctly in cart', async ({ page }) => {

    await loginPage.login(users.standardUser.userName, users.standardUser.password);
    await inventory.addProductToCart(constants.text.sauseLabBagepack);
    await inventory.addProductToCart(constants.text.sauseLabBikeLight);
    await cart.goToCart();
    await expect(page).toHaveURL(constants.urls.cartUrl);
    const itemNames = await cart.getAllCartNames();
    expect(itemNames).toEqual([constants.text.sauseLabBagepack, constants.text.sauseLabBagepack]);

})

test('Product can be removed from Cart', async ({ page }) => {

    await loginPage.login(users.standardUser.userName, users.standardUser.password);
    await inventory.addProductToCart(constants.text.sauseLabBagepack);
    await inventory.addProductToCart(constants.text.sauseLabBikeLight);
    await cart.goToCart();
    await cart.removeItems(constants.text.sauseLabBagepack);
    const cartItemCount = await cart.getCartItemCount();
    expect(cartItemCount).toBe(1);

    const remainingCartName = await cart.getAllCartNames();
    expect(remainingCartName).toEqual(constants.text.sauseLabBikeLight);

})

test('Add a product to cart and head to checkout and user can proceed with right info', async ({ page }) => {

    await loginPage.login(users.standardUser.userName, users.standardUser.password);
    await inventory.addProductToCart(constants.text.sauseLabBagepack);
    await inventory.addProductToCart(constants.text.sauseLabBikeLight);
    await cart.goToCart();
    await cart.clickOnCheckout();
    await cart.fillInformation(constants.checkOutData.firstName, constants.checkOutData.lastName, constants.checkOutData.zip);
    await cart.clickOnContinueButton();

    await expect(page).toHaveURL(constants.urls.overviewUrl);

    const subTotal = await cart.getSubTotal();
    const tax = await cart.getTax();
    const total = await cart.totalPrice();

    expect(total).toBeCloseTo(subTotal + tax);

    await cart.clickOnFinishButton();

    await expect(page).toHaveURL(constants.urls.thankyoupageurl);
    await expect(cart.getCompleteHeaderButton).toHaveText('Thank you for your order!')


})