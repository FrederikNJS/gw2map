module.exports = function(config) {
  config.set({
    frameworks: ['jspm', 'jasmine', 'phantomjs-shim'],

    jspm: {
      loadFiles: [
        'test/**/*.js',
      ],
      serveFiles: [
        'javascript/**/*.js',
      ],
    },

    reporters: ['mocha'],
    mochaReporter: {
      output: 'autowatch',
    },

    browsers: ['PhantomJS'],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity,
  })
}
