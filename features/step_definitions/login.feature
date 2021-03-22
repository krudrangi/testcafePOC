Feature: Login Feature


  As a registered visitor I should be able to login to my account

  Scenario: registered user should be able to login sucessfully after providing correct credentials.
    Given Open Home Page
    When I click on Login button
    And I enter my correct user name "kiran@cypress.com"
    And I enter my correct password "testtest"
    And I click submit button
    Then Logout button shold be displayed.


