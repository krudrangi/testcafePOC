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

fixture`F1-Rent NextJS- PDP-Lead-Submission`
  .page(pdpUrl)
  .requestHooks(headerBypassAutorization)

test('F1-t1 Verify URL on PDP', async t => {
  await t
    .maximizeWindow()
    .expect(getUrl()).contains(pdpUrl)
});

test('F1-t2 Verify & Validate PDP Listing Title', async t => {
  await t
    .expect(pdpPage.propertyTitle.exists).ok()
    .expect(pdpPage.propertyTitle.visible).ok()
    .expect((pdpPage.propertyTitle).innerText).eql(pdpListingTitle, '** Listing Name NOT matching **');
});

test('F1-t3 Finding number of available Leads forms on PDP & submit them', async t => {
  const counter = await pdpPage.leadFormXpathSelector.count
  console.log('Available Lead Forms:', counter);

  for (let i = 0; i < counter; i++) {
    console.log('Submitting Lead Number # ', i + 1);

    if (await pdpPage.leadFormXpathSelector.nth(i).visible) {
      await t
        .setTestSpeed(0.5)
        .expect(pdpPage.leadFormXpathSelector.nth(i).visible).ok()
        .typeText(pdpPage.leadFormNameXpathSelector.nth(i), 'FOODY DAN', { speed: 0.5 })
        .typeText(pdpPage.leadFormEmailXpathSelector.nth(i), 'kiran@testcafe.com', { replace: true, paste: true })
        .typeText(pdpPage.leadFormPhoneXpathSelector.nth(i), '8885554444', { replace: true, paste: true })
        .expect((pdpPage.leadFormSubmitButtonXpathSelector.nth(i)).innerText).eql('Send', '** Send Button text NOT matching **');

      await t
        .expect(pdpPage.leadFormSubmitButtonXpathSelector.nth(i).exists).ok()
        .click(pdpPage.leadFormSubmitButtonXpathSelector.nth(i));

      await t
        .expect(pdpPage.thankyouModalAckMsg.visible).ok()
        .expect((pdpPage.thankyouModalAckMsg).innerText).eql('Your message has been sent.', '** Ack Msg NOT matching **')
        .expect(pdpPage.thankyouModalCloseBtn.visible).ok()
        .click(pdpPage.thankyouModalCloseBtn)
        .expect(pdpPage.leadFormXpathSelector.nth(i).visible).ok();
    } else {
      console.log('Lead Form ', i + 1, ' is not visible..')
    }
  }
});