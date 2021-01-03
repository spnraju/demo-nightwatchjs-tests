module.exports = {
  'DuckduckGo Launch' : function (browser) {
    browser
      .url('https://www.phptravels.net/home')
      .waitForElementVisible('body')
      .assert.titleContains('Technology')
      .end();
  }
};