import { Selector, ClientFunction, t } from 'testcafe';
import { elementByXPath } from '../../commands/elementByXpath';
class pdp {

  constructor() {

    this.propertyTitle = Selector('[data-tid="property-title"]');

    this.leadFormXpathSelector = Selector(elementByXPath('//form[@data-tag_section="lead_submission_form"]'));
    this.leadFormNameXpathSelector = Selector(elementByXPath('//form[@data-tag_section="lead_submission_form"]/descendant::input[@data-tid="lead-form-name"]'));
    this.leadFormEmailXpathSelector = Selector(elementByXPath('//form[@data-tag_section="lead_submission_form"]/descendant::input[@data-tid="lead-form-email"]'));
    this.leadFormPhoneXpathSelector = Selector(elementByXPath('//form[@data-tag_section="lead_submission_form"]/descendant::input[@data-tid="lead-form-phone"]'));
    this.leadFormSubmitButtonXpathSelector = Selector(elementByXPath('//form[@data-tag_section="lead_submission_form"]/descendant::button[@data-tid="lead-form-submit"]'));

    this.thankyouModalAckMsg = Selector('[data-tid="modal"] div');
    this.thankyouModalCloseBtn = Selector('[data-tid="close-modal"]');
  }


}
export default new pdp();