import { Selector, ClientFunction, t } from 'testcafe';
class pdp {

  constructor() {
    const elementByXPath = Selector(xpath => {
      const iterator = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null)
      const items = [];

      let item = iterator.iterateNext();

      while (item) {
        items.push(item);
        item = iterator.iterateNext();
      }

      return items;
    });

    this.propertyTitle = Selector('[data-tid="property-title"]');
    this.leadFormXpathSelector = Selector(elementByXPath('//form[@data-tag_section="lead_submission_form"]'));
    this.leadFormNameXpathSelector = Selector(elementByXPath('//form[@data-tag_section="lead_submission_form"]/descendant::input[@data-tid="lead-form-name"]'));
    this.leadFormEmailXpathSelector = Selector(elementByXPath('//form[@data-tag_section="lead_submission_form"]/descendant::input[@data-tid="lead-form-email"]'));
    this.leadFormPhoneXpathSelector = Selector(elementByXPath('//form[@data-tag_section="lead_submission_form"]/descendant::input[@data-tid="lead-form-phone"]'));
    this.leadFormSubmitButtonXpathSelector = Selector(elementByXPath('//form[@data-tag_section="lead_submission_form"]/descendant::button[@data-tid="lead-form-submit"]'));

    this.firstLeadFrom = Selector(elementByXPath('//form[@data-tag_section="lead_submission_form"]')).nth(0);
    this.secondLeadFrom = Selector(elementByXPath('//form[@data-tag_section="lead_submission_form"]')).nth(1);
    this.thirdLeadFrom = Selector(elementByXPath('//form[@data-tag_section="lead_submission_form"]')).nth(2);

    this.thankyouModalAckMsg = Selector('[data-tid="modal"] div');
    this.thankyouModalCloseBtn = Selector('data-tid="close-modal"]');
  }


}
export default new pdp();