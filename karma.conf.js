// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
  config.set({
    autoWatch: true,
    basePath: "",
    browsers: ["Chrome"],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    colors: true,
    coverageIstanbulReporter: {
      dir: require("path").join(__dirname, "./coverage/fitness-tracker"),
      fixWebpackSourcePaths: true,
      reports: ["html", "lcovonly", "text-summary"],
    },
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    logLevel: config.LOG_INFO,
    plugins: [
      // see https://github.com/angular/angular-cli/issues/7308
      "@angular-devkit/build-angular/plugins/karma",
      "karma-jasmine",
      "karma-chrome-launcher",
      "karma-jasmine-html-reporter",
      "karma-coverage-istanbul-reporter",
    ],
    port: 9876,
    reporters: ["progress", "kjhtml"],
    restartOnFileChange: true,
    singleRun: false,
  })
}
