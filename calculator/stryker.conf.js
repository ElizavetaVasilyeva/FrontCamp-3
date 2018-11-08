module.exports = function(config) {
  config.set({
    files: [
      {
        pattern: "src/**/*.js",
        mutated: true,
        included: false
      },
      "test/**/*.js"
    ],
    testRunner: 'mocha',
    testFramework: 'mocha',
    testSelector: null,
    reporter: ['clear-text', 'progress'],
    plugins: ['stryker-mocha-framework', 'stryker-mocha-runner']
  });
};
