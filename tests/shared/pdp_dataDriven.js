import { Selector, ClientFunction } from 'testcafe';
import authorize from '../commands/headerAuth';
import pdpPage from '../objectRepo/shared/pdp';


const pdpUrl = 'https://qa-next.rent.com/georgia/atlanta-apartments/the-savoy-4-497285'
const dataSet = require('../test_data/testdata.json');
const pdpListingTitle = 'The Savoy';

fixture('F1 - PDP PAGE FIXTURE')

dataSet.forEach(data => {
  test.page(pdpUrl)
    .requestHooks(authorize)
    (`LEAD test for - ${data.name}`, async t => {
      let i = 0;
      if (t.browser.platform === 'desktop') {
        i = 2;
        console.log('Running test on ', t.browser.platform + ' ' + t.browser.name)
      } else if (t.browser.platform === 'mobile') {
        i = 1;
        console.log('Running test on ', t.browser.platform + ' ' + t.browser.name)
      } else if (t.browser.platform === 'tablet') {
        i = 1;
        console.log('Running test on ', t.browser.platform + ' ' + t.browser.name)
      }
      await t
        .maximizeWindow()
        .setTestSpeed(0.5)
        .expect(pdpPage.leadFormXpathSelector.nth(i).visible).ok()
        .hover(pdpPage.leadFormSubmitButtonXpathSelector.nth(i))
        .typeText(pdpPage.leadFormNameXpathSelector.nth(i), data.name, { replace: true, paste: true })
        .typeText(pdpPage.leadFormEmailXpathSelector.nth(i), data.email, { replace: true, paste: true })
        .typeText(pdpPage.leadFormPhoneXpathSelector.nth(i), data.phone, { replace: true, paste: true })
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
      console.log(`PDP Sticky Lead submission completed for ${data.name}`);

      await t.wait(1000);

    })
})

