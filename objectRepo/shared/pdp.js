"use strict";
exports.__esModule = true;
var testcafe_1 = require("testcafe");
// const pdpCommands = {
//   validatePropName: (pdp, propName) => {
//     pdp.expect.element('@propertyName').to.be.visible.after(0)
//     pdp.expect.element('@propertyName').text.to.equal(propName)
//   },
// }
var pdp = /** @class */ (function () {
    function pdp() {
        this.propertyTitle = testcafe_1.Selector('[data-tid="property-title"]');
        this.sendEmailButton = testcafe_1.Selector('[data-tid="button"]').withText('Send an Email');
        this.leadModal = testcafe_1.Selector('[data-tid="modal"]');
        // commands: [pdpCommands]
    }
    return pdp;
}());
exports["default"] = new pdp();
