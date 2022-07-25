require('dotenv').config()

const Services = {};
loadServices();

module.exports = {
  src_folders: ['tests/'],
  page_objects_path: '',
  custom_commands_path: '',
  custom_assertions_path: '',
  globals_path: '',
  output_folder: 'reports',
  disable_colors: false,
  live_output: false,
  silent: true,
  output: true,
  detailed_output: false,
  disable_error_log: false,
  output_timestamp: false,
  log_screenshot_data: false,
  webdriver: {},
  test_workers: {
    enabled: true,
    workers: 'auto',
  },
  test_settings: {
    default: {
      disable_error_log: false,
      launch_url: 'https://nightwatchjs.org',
      screenshots: {
        enabled: false,
        path: 'screens',
        on_failure: false,
      },
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: false,
        chromeOptions: {
          args: ['--no-sandbox', '--ignore-certificate-errors', '--allow-insecure-localhost', '--headless'],
        },
      },
      webdriver: {
        start_process: true,
        port: 9515,
        server_path: Services.chromedriver ? Services.chromedriver.path : '',
        log_path: false,
      },
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        alwaysMatch: {
          'moz:firefoxOptions': {
            args: [],
          },
        },
      },
      webdriver: {
        start_process: true,
        port: 4444,
        server_path: Services.geckodriver ? Services.geckodriver.path : '',
        cli_args: [],
        log_path: false,
      },
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: false,
        chromeOptions: {
          args: ['--no-sandbox', '--ignore-certificate-errors', '--allow-insecure-localhost', '--headless'],
        },
      },
      webdriver: {
        start_process: true,
        port: 9515,
        server_path: Services.chromedriver ? Services.chromedriver.path : '',
        log_path: false,
      },
    },

    //////////////////////////////////////////////////////////////////////////////////
    // Configuration for when using the browserstack.com cloud service               |
    //                                                                               |
    // Please set the username and access key by setting the environment variables:  |
    // - BROWSERSTACK_USER                                                           |
    // - BROWSERSTACK_KEY                                                            |
    // .env files are supported                                                      |
    //////////////////////////////////////////////////////////////////////////////////
    browserstack: {
      selenium: {
        host: 'hub-cloud.browserstack.com',
        port: 443,
      },
      desiredCapabilities: {
        'bstack:options': {
          local: 'false',
          userName: '${BROWSERSTACK_USER}',
          accessKey: '${BROWSERSTACK_KEY}',
        },
      },
      disable_error_log: true,
      webdriver: {
        keep_alive: true,
        start_process: false,
      },
    },
    'browserstack.chrome': {
      extends: 'browserstack',
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          // This tells Chromedriver to run using the legacy JSONWire protocol
          // More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
          w3c: false,
        },
      },
    },
    'browserstack.firefox': {
      extends: 'browserstack',
      desiredCapabilities: {
        browserName: 'firefox',
      },
    },
    'browserstack.ie': {
      extends: 'browserstack',
      desiredCapabilities: {
        browserName: 'IE',
        browserVersion: '11.0',
        'bstack:options': {
          os: 'Windows',
          osVersion: '10',
          local: 'false',
          seleniumVersion: '3.5.2',
          resolution: '1366x768',
        },
      },
    },

    //////////////////////////////////////////////////////////////////////////////////
    // Configuration for when using the Selenium service, either locally or remote,  |
    //  like Selenium Grid                                                           |
    //////////////////////////////////////////////////////////////////////////////////
    // selenium: {
    //   // Selenium Server is running locally and is managed by Nightwatch
    //   selenium: {
    //     start_process: true,
    //     port: 4444,
    //     server_path: (Services.seleniumServer ? Services.seleniumServer.path : ''),
    //     cli_args: {
    //       'webdriver.gecko.driver': (Services.geckodriver ? Services.geckodriver.path : ''),
    //       'webdriver.chrome.driver': (Services.chromedriver ? Services.chromedriver.path : '')
    //     }
    //   }
    // },

    // 'selenium.chrome': {
    //   extends: 'selenium',
    //   desiredCapabilities: {
    //     browserName: 'chrome',
    //     chromeOptions : {
    //       w3c: false
    //     }
    //   }
    // },

    // 'selenium.firefox': {
    //   extends: 'selenium',
    //   desiredCapabilities: {
    //     browserName: 'firefox',
    //     'moz:firefoxOptions': {
    //       args: [
    //         // '-headless',
    //         // '-verbose'
    //       ]
    //     }
    //   }
    // }
  },
};

function loadServices() {
  try {
    Services.seleniumServer = require('selenium-server');
  } catch (err) {
    console.warn(err);
  }

  try {
    Services.chromedriver = require('chromedriver');
  } catch (err) {
    console.warn(err);
  }

  try {
    Services.geckodriver = require('geckodriver');
  } catch (err) {
    console.warn(err);
  }
}
