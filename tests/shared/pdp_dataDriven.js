import { Selector, ClientFunction } from 'testcafe';
import authorize from '../commands/headerAuth';
import pdpPage from '../objectRepo/shared/pdp';


const pdpUrl = 'https://qa-next.rent.com/georgia/atlanta-apartments/the-savoy-4-497285'
const dataSet = require('../test_data/testdata.json');
const pdpListingTitle = 'The Savoy';

fixture('F1 - PDP PAGE FIXTURE')

dataSet.forEach(data => {
  console.log(data)
  test.page(pdpUrl)
    .requestHooks(authorize)
    (`SENDING LEAD for - ${data.name}`, async t => {
      await t
        .maximizeWindow()
        .setTestSpeed(0.5)
        .expect(pdpPage.leadFormXpathSelector.nth(1).visible).ok()
        .typeText(pdpPage.leadFormNameXpathSelector.nth(1), data.name, { speed: 0.5 })
        .typeText(pdpPage.leadFormEmailXpathSelector.nth(1), data.email, { replace: true, paste: true })
        .typeText(pdpPage.leadFormPhoneXpathSelector.nth(1), data.phone, { replace: true, paste: true })
        .expect((pdpPage.leadFormSubmitButtonXpathSelector.nth(1)).innerText).eql('Send', '** Send Button text NOT matching **');

    })
})

