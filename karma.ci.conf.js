module.exports = function(config) {
  config.set({
    frameworks: ['jspm', 'jasmine'],

    jspm: {
      loadFiles: [
        'test/**/*.js',
      ],
      serveFiles: [
        'javascript/**/*.js',
      ],
    },

    reporters: ['mocha', 'junit'],
    junitReporter: {
      outputDir: process.env.CIRCLE_TEST_REPORTS,
    },

    browsers: ['PhantomJS'],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity,
  })
}
