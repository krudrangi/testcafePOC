import { Selector, ClientFunction, t } from 'testcafe';
class pdp {

  constructor() {
    this.propertyTitle = Selector('[data-tid="property-title"]');
    this.leadSubmissionForm = Selector('[data-tag_section="lead_submission_form"]');

    this.sendEmailButton = Selector('[data-tid="button"]').withText('Send an Email');
    this.leadModal = Selector('[data-tid="modal"]');
  }

}
export default new pdp();