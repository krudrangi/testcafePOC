import { Selector, ClientFunction } from 'testcafe';

const testPageUrl = 'https://qa-next.rent.com'

const setCookies = ClientFunction(() => {
  document.cookie = 'x-rp-fwbypass=true';
  document.cookie = 'domain=.rent.com';
});

const getCookie = ClientFunction(() => {
  return document.cookie;
});

fixture`Rent NextJS Login test from Home Page`
  .page(testPageUrl)
  .beforeEach(async t => {
    // console.log('set cookies');
    await setCookies();
    await t.navigateTo(testPageUrl);
  });

test('Should have a Login button on Home Page', async t => {
  //console.log('get cookies:' + await getCookie());
  await t
    // .maximizeWindow()
    .expect(Selector('[data-tid="sign-in"]').visible).ok()
});

test('Login test from Home Page', async t => {
  //console.log('get cookies:' + await getCookie());
  await t
    // .maximizeWindow()
    .click(Selector('[data-tid="sign-in"]'))
    .expect(Selector('[id^="email-"]').visible).ok()
    .typeText(Selector('[id^="email-"]'), 'kiran@cypress.com', { speed: 0.5 })
    .expect(Selector('[id^="password-"]').visible).ok()
    .typeText(Selector('[id^="password-"]'), 'testtest', { speed: 1 })
    .expect(Selector('[data-tid="send-button"]').visible).ok()
    .click(Selector('[data-tid="send-button"]'))
    .expect(Selector('[data-tid="sign-out"]').visible).ok()
    .wait(1000);
});
