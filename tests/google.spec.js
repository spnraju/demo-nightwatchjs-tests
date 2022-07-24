module.exports = {
  'Google Launch': function (browser) {
    browser.url('https://www.google.com/').waitForElementVisible('body').assert.titleContains('Google').end();
  },
};
