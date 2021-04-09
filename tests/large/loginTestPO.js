import { Selector, ClientFunction } from 'testcafe';
import homePage from '../objectRepo/large/homePage';

const testPageUrl = 'https://qa-next.rent.com'

const setCookies = ClientFunction(() => {
  document.cookie = 'x-rp-fwbypass=true';
  document.cookie = 'domain=.rent.com';
});

fixture`F1-Rent NextJS Login test from Home Page`
  .meta('fixtureID', 'f-0001')
  .meta({ author: 'Kiran Rudrangi', creationDate: '03/10/2021' })
  .page(testPageUrl)
  .beforeEach(async t => {
    await setCookies();
    await t
      .navigateTo(testPageUrl)
      .maximizeWindow()
      .setTestSpeed(1) //Must be a number between 0.01 to 1
      .setPageLoadTimeout(0);

  });

test('F1-t1 Should have a Login button on Home Page', async t => {
  await t.expect(homePage.signIn.exists).ok();
});

test('F1-t2 Click on Login & Verify LogOut button visible on Success', async t => {
  await t.click(homePage.signIn)
  await t.expect(homePage.email.exists).ok();
  await homePage.typeEmail('kiran@cypress.com'); // correct id
  await t.expect(homePage.password.exists).ok();
  await homePage.typePassword('testtest');
  await t.expect(homePage.submit.exists).ok();
  await homePage.submitLead();
  await t.expect(homePage.signOut.exists).ok();
});

fixture`F2 Second fixture from Home Page`
  .meta('fixtureID', 'f-0002')
  .meta({ author: 'Kiran Rudrangi', creationDate: '03/10/2021' })
  .page(testPageUrl)
  .beforeEach(async t => {
    await setCookies();
    await t.navigateTo(testPageUrl);
  });

test('F2-t1 Should have a Login button on Home Page', async t => {
  await t.expect(homePage.signIn.exists).ok();
});

test('F2-t2 Login with incorrect id & Verify failure message', async t => {
  await t.click(homePage.signIn)
  await t.expect(homePage.email.exists).ok();
  await homePage.typeEmail('kiran@test.com'); // wrong id
  await t.expect(homePage.password.exists).ok();
  await homePage.typePassword('testtest');
  await t.expect(homePage.submit.exists).ok();
  await homePage.submitLead();
  await t.expect(homePage.emailError.innerText).eql('The username or password you entered is incorrect.');
});
