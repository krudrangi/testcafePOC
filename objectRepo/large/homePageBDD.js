const { Selector } = require('testcafe');

function select(selector) {
  return Selector(selector).with({ boundTestRun: testController })
}


exports.homePage = {

  signIn: function () {
    return select('[data-tid="sign-in"]');
  },
  email: function () {
    return select('[id^="email-"]');
  },
  password: function () {
    return select('[id^="password-"]');
  },
  submit: function () {
    return select('[data-tid="send-button"]');
  },
  signOut: function () {
    return select('[data-tid="sign-out"]');
  },
  emailError: function () {
    return select('[data-tid="email-error"]');
  },


  async typeEmail(e) {
    await t
      .typeText(this.email, e, { speed: 0.1 }) // between 0.1 to 1
  },

  async typePassword(pw) {
    await t
      .typeText(this.password, pw, { replace: true, paste: true })
  },

  async submitLead() {
    await t
      .click(this.submit)
  }

}