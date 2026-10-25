//@ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const users = require('../data/users');
const constants = require('../data/constants')

/** @type {LoginPage} */
let loginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.open();

})

test('user can login with valid credential @smoke', async ({ page }) => {

  await loginPage.login(users.standardUser.userName, users.standardUser.password);
  await expect(page).toHaveURL(constants.urls.inventoryUrl);
  await expect(page.locator('.title')).toHaveText(constants.text.productTitle);

});

