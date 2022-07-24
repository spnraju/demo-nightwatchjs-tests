module.exports = {
  'DuckduckGo Launch': function (browser) {
    browser.url('https://www.duckduckgo.com/').waitForElementVisible('body').assert.titleContains('DuckDuckGo').end();
  },
};
