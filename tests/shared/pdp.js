import { Selector, ClientFunction } from 'testcafe';
import pdpPage from '../../objectRepo/shared/pdp';

const pdpUrl = 'https://qa-next.rent.com/georgia/atlanta-apartments/the-savoy-4-497285'
const pdpListingTitle = 'The Savoy';

const getUrl = ClientFunction(() => window.location.href);

const setCookies = ClientFunction(() => {
  document.cookie = 'x-rp-fwbypass=true';
  document.cookie = 'domain=.rent.com';
});

fixture`F1-Rent NextJS- PDP-Sticky-Lead-Submission`
  .meta('fixtureID', 'f-0001')
  .meta({ author: 'Kiran Rudrangi', creationDate: '03/31/2021' })
  .page(pdpUrl)
  .beforeEach(async t => {
    await setCookies();
    await t
      .navigateTo(pdpUrl)
      .setPageLoadTimeout(3000)
      .setTestSpeed(1) //Must be a number between 0.01 to 1
  });

test('F1-t1 Verify URL on PDP', async t => {
  await t
    .expect(getUrl()).contains(pdpUrl)
});

test('F1-t2 Verify & Validate PDP Listing Title', async t => {
  await t
    .expect(pdpPage.propertyTitle.exists).ok()
    .expect((pdpPage.propertyTitle).innerText).eql(pdpListingTitle, '** Listing Name NOT matching **')
});

test('F1-t3 First Inline Lead Form on PDP', async t => {
  await t
    .expect(pdpPage.leadFormXpathSelector.nth(0).exists).ok()
    .typeText(pdpPage.leadFormNameXpathSelector.nth(0), 'FOODY DAN', { replace: true, paste: true })
    .typeText(pdpPage.leadFormEmailXpathSelector.nth(0), 'kiran@cypress.com', { replace: true, paste: true })
    .typeText(pdpPage.leadFormPhoneXpathSelector.nth(0), '8885554444', { replace: true, paste: true });
  console.log(await pdpPage.leadFormSubmitButtonXpathSelector.nth(0).innerText);


  await pdpPage.leadFormSubmitButtonXpathSelector.nth(0).with({ visibilityCheck: true }).with({ timeout: 10000 });
  await t
    .click(pdpPage.leadFormSubmitButtonXpathSelector.nth(0))
    .wait(2000)
    .expect(pdpPage.thankyouModalCloseButton.exists).ok()
    .expect(pdpPage.thankyouModalCloseButton.exists).ok();
});


