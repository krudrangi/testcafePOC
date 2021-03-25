import { Selector, ClientFunction, t } from 'testcafe';

// const pdpCommands = {
//   validatePropName: (pdp, propName) => {
//     pdp.expect.element('@propertyName').to.be.visible.after(0)
//     pdp.expect.element('@propertyName').text.to.equal(propName)
//   },
// }

class pdp {

  propertyTitle: Selector = Selector('[data-tid="property-title"]');
  sendEmailButton: Selector = Selector('[data-tid="button"]').withText('Send an Email');
  leadModal: Selector = Selector('[data-tid="modal"]');

  elements: {
    stickyLeadForm: '[data-tag_section="lead_submission_form"]'
  }

  sections: {
    stickyLeadFormSection: {
      selector: '[data-tag_section="lead_submission_form"]',
      elements: {
        name: '[data-tid="lead-form-name"]',
        email: '[data-tid="lead-form-email"]',
        phone: '[data-tid="lead-form-phone"]',
        submit: '[data-tid="lead-form-submit"]',
      },
    },
  }
  // commands: [pdpCommands]
}
export default new pdp();