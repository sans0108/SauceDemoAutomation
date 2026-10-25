//@ts-check
const {test, expect} =require('@playwright/test');
const {LoginPage} = require('../pages/LoginPage');
const {InventoryPage} = require('../pages/Inventory');
const users = require('../data/users');
const constants = require('../data/constants');

/** @type {LoginPage} */
let loginPage ;

/** @type {InventoryPage} */
let inventory ;

test.beforeEach(async({page})=> {
    loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(users.standardUser.userName, users.standardUser.password);
    inventory = new InventoryPage(page);

})

test(`Cart Badge Upates when adding products`, async ({page})=>{

    
    await inventory.addProductToCart(constants.text.sauseLabBagepack);
    await inventory.addProductToCart(constants.text.sauseLabBikeLight);
    const cartCount = await inventory.getCartCount();
    expect(cartCount).toBe(2);
})

test('Products can be sorted by price, price low to high', async({page})=>{
    await inventory.sortBy(constants.sortOptions.priceLowToHigh); //it will click on sort option
    const prices = await inventory.getAllProductPrices();
    const sortedPrices =  [...prices].sort((a, b)=>a-b);
    expect(prices).toEqual(sortedPrices);
})


