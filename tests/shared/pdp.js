import { Selector, RequestHook, ClientFunction } from 'testcafe';
import pdpPage from '../../objectRepo/shared/pdp';

class HeaderBypassAutorization extends RequestHook {
  constructor() {
    super();
  }
  onRequest(e) {
    e.requestOptions.headers['x-rp-fwbypass'] = 'true';
    e.requestOptions.headers['domain'] = '.rent.com';
  }
  onResponse(e) {
    // This method must also be overridden, but you can leave it blank.
  }

}

const headerBypassAutorization = new HeaderBypassAutorization();
const pdpUrl = 'https://qa-next.rent.com/georgia/atlanta-apartments/the-savoy-4-497285'
const getUrl = ClientFunction(() => window.location.href);
const pdpListingTitle = 'The Savoy';

// const scrollBy = ClientFunction((x, y) => {
//   window.scrollBy(x, y);
// });

// const scrollToElement = ClientFunction((selector, offsetX, offsetY) => {
//   const element = selector();

//   if (element && element.scrollIntoView)
//     element.scrollIntoView();

//   else if (offsetX !== void 0 && offsetY !== void 0)
//     window.scrollBy(offsetX, offsetY);
// });

fixture`F1-Rent NextJS- PDP-Sticky-Lead-Submission`
  .page(pdpUrl)
  .requestHooks(headerBypassAutorization)

test('F1-t1 Verify URL on PDP', async t => {
  await t
    .expect(getUrl()).contains(pdpUrl)
});

test('F1-t2 Verify & Validate PDP Listing Title', async t => {
  await t
    .expect(pdpPage.propertyTitle.exists).ok()
    .expect((pdpPage.propertyTitle).innerText).eql(pdpListingTitle, '** Listing Name NOT matching **')
});

test('F1-t3 First Inline Lead submit on PDP', async t => {
  await t
    .setTestSpeed(0.5)
    .expect(pdpPage.leadFormXpathSelector.nth(0).exists).ok()
    .typeText(pdpPage.leadFormNameXpathSelector.nth(0), 'FOODY DAN', { speed: 1 })
    .typeText(pdpPage.leadFormEmailXpathSelector.nth(0), 'kiran@cypress.com', { replace: true, paste: true })
    .typeText(pdpPage.leadFormPhoneXpathSelector.nth(0), '8885554444', { replace: true, paste: true });

  console.log(await pdpPage.leadFormSubmitButtonXpathSelector.nth(0).innerText);
  await t
    .expect(pdpPage.leadFormSubmitButtonXpathSelector.nth(0).exists).ok()
    .click(pdpPage.leadFormSubmitButtonXpathSelector.nth(0));

  // await scrollToElement(pdpPage.leadFormSubmitButtonXpathSelector.nth(0), 1000, 0);
  // await t.wait(3000)
});

test('F1-t3 Validate Thank you Modal', async t => {
  await t
    .expect(pdpPage.thankyouModalAckMsg.exists).ok()
    .expect(pdpPage.thankyouModalCloseBtn.exists).ok()
    .click(pdpPage.thankyouModalCloseButton)
    .expect(pdpPage.leadFormXpathSelector.nth(0).exists).ok();
});