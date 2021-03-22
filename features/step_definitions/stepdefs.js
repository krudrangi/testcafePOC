const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const homepage = require('../../ObjRep/large/homePageBDD')


const testPageUrl = 'https://qa-next.rent.com'

Given('Open Home Page', async function () {
  await testController.navigateTo(testPageUrl)
});

When('I click on Login button', function () {
  await testController.click(homepage.signIn)
});

When('I enter my correct user name {string}', function (email) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});


When('I enter my correct password {string}', function (password) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});


When('I click submit button', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('Logout button shold be displayed.', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});
