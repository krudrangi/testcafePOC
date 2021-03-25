import { Selector, ClientFunction } from 'testcafe';
import pdp from '../../objectRepo/shared/pdp';

const testPageUrl = 'https://qa-next.rent.com/georgia/atlanta-apartments/the-savoy-4-497285'

const getUrl = ClientFunction(() => window.location.href);

const setCookies = ClientFunction(() => {
  document.cookie = 'x-rp-fwbypass=true';
  document.cookie = 'domain=.rent.com';
});

fixture`F1-Rent NextJS- PDP-Sticky-Lead-Submission`
  .meta('fixtureID', 'f-0001')
  .meta({ author: 'Kiran Rudrangi', creationDate: '03/25/2021' })
  .page(testPageUrl)
  .beforeEach(async t => {
    await setCookies();
    await t
      .navigateTo(testPageUrl)
      .maximizeWindow()
      .setTestSpeed(1) //Must be a number between 0.01 to 1
  });

test('F1-t1 Verify URL on PDP', async t => {
  await t
    .expect(getUrl()).contains(testPageUrl)
});

test('F1-t2 Should have a sendAnEmailButton button on PDP', async t => {
  await t
    .expect(pdp.propertyTitle.exists).ok()
    .expect(pdp.sendEmailButton.exists).ok();
  await t.click(pdp.sendEmailButton)
    .expect(pdp.leadModal.exists).ok()
    .wait(9000);
});
