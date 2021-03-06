import { Selector, ClientFunction, t } from 'testcafe';

class homePage {
  hamburgerMenu: Selector = Selector('[aria-label="hamburger-menu"]');
  signIn: Selector = Selector('[data-tid="menu-sign-in"]');
  email: Selector = Selector('[data-tid="email"]');
  password: Selector = Selector('[data-tid="password"]');
  submit: Selector = Selector('[data-tid="send-button"]');
  signOut: Selector = Selector('[data-tid="menu-sign-out"]');
  emailError: Selector = Selector('[data-tid="email-error"]');


  async typeEmail(e) {
    await t
      .typeText(this.email, e, { speed: 1 }) // between 0.1 to 1
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