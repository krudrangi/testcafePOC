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
      .setTestSpeed(1) //Must be a number between 0.01 to 1
  });

test('F1-t1 Verify URL on PDP', async t => {
  await t
    .expect(getUrl()).contains(pdpUrl)
});

test('F1-t2 Verify & Validate PDP Listing Title', async t => {
  await t
    .expect(pdpPage.propertyTitle.exists).ok()
    .expect(await Selector(pdpPage.propertyTitle).innerText).eql(pdpListingTitle, '** Listing Name not matching **')
});

test('F1-t3 Verify & Validate Lead Submission Form on PDP', async t => {
  await t
    .expect(pdpPage.leadSubmissionForm.exists).ok()
});
