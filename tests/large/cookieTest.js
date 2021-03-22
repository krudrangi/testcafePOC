import { Selector, ClientFunction } from 'testcafe';

const testPageUrl = 'https://qa-next.rent.com'

const setCookies = ClientFunction(() => {
  document.cookie = 'x-rp-fwbypass=true';
  document.cookie = 'domain=.rent.com';
});

const getCookie = ClientFunction(() => {
  return document.cookie;
});

fixture`Cookie Test Rent NextJS`
  .page(testPageUrl)
  .beforeEach(async t => {
    console.log('set cookies');
    await setCookies();
    await t.navigateTo(testPageUrl);
  });

test('Test 2 - Check Home Page', async t => {
  console.log('get cookies:' + await getCookie());
  await t.click(Selector('h2'));
});

test('Test 1 - Check Home Page', async t => {
  console.log('get cookies:' + await getCookie());
  await t.click(Selector('h2'));
});
