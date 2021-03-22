import { Selector, ClientFunction } from 'testcafe';
import homePage from '../../ObjRep/small/homePage';

const testPageUrl = 'https://qa-next.rent.com'

const setCookies = ClientFunction(() => {
  document.cookie = 'x-rp-fwbypass=true';
  document.cookie = 'domain=.rent.com';
});

fixture`F1-Rent NextJS Mobile Login test from Home Page`
  .meta('fixtureID', 'f-0001')
  .meta({ author: 'Kiran Rudrangi', creationDate: '03/10/2021' })
  .page(testPageUrl)
  .beforeEach(async t => {
    await setCookies();
    await t.navigateTo(testPageUrl);
  });

test('F1-t1 Should have a Login success', async t => {
  await t.expect(homePage.hamburgerMenu.exists).ok();
  await t.click(homePage.hamburgerMenu);
  await t.expect(homePage.signIn.exists).ok();
  await t.click(homePage.signIn)
  await t.expect(homePage.email.exists).ok();
  await homePage.typeEmail('kiran@cypress.com'); // correct id
  await t.expect(homePage.password.exists).ok();
  await homePage.typePassword('testtest');
  await t.expect(homePage.submit.exists).ok();
  await homePage.submitLead();
  await t.expect(homePage.hamburgerMenu.exists).ok();
  await t.click(homePage.hamburgerMenu);
  await t.expect(homePage.signOut.exists).ok();
});

fixture`F2-Rent NextJS Mobile Login failure test from Home Page`
  .meta('fixtureID', 'f-0002')
  .meta({ author: 'Kiran Rudrangi', creationDate: '03/10/2021' })
  .page(testPageUrl)
  .beforeEach(async t => {
    await setCookies();
    await t.navigateTo(testPageUrl);
  });

test('F2-t1 Should have a Login failure', async t => {
  await t.expect(homePage.hamburgerMenu.exists).ok();
  await t.click(homePage.hamburgerMenu);
  await t.expect(homePage.signIn.exists).ok();
  await t.click(homePage.signIn)
  await t.expect(homePage.email.exists).ok();
  await homePage.typeEmail('kiran@test.com'); // wrong id
  await t.expect(homePage.password.exists).ok();
  await homePage.typePassword('testtest');
  await t.expect(homePage.submit.exists).ok();
  await homePage.submitLead();
  await t.expect(homePage.emailError.innerText).eql('The username or password you entered is incorrect.');
});
