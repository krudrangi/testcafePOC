import { Selector, ClientFunction, t } from 'testcafe';

class homePage {

  signIn: Selector = Selector('[data-tid="sign-in"]');
  email: Selector = Selector('[id^="email-"]');
  password: Selector = Selector('[id^="password-"]');
  submit: Selector = Selector('[data-tid="send-button"]');
  signOut: Selector = Selector('[data-tid="sign-out"]');
  emailError: Selector = Selector('[data-tid="email-error"]');


  async typeEmail(e) {
    await t
      .typeText(this.email, e, { speed: 0.1 }) // between 0.1 to 1
  }

  async typePassword(pw) {
    await t
      .typeText(this.password, pw, { replace: true, paste: true })
  }

  async submitLead() {
    await t
      .click(this.submit)
  }

}
export default new homePage();