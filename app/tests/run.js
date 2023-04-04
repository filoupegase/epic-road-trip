const Jasmine = require("jasmine");
const specReporter = require("jasmine-spec-reporter").SpecReporter;

const jasmine = new Jasmine();
jasmine.configureDefaultReporter({ print: () => {} });
jasmine.addReporter(new specReporter());
jasmine.loadConfigFile("tests/jasmine.json");
jasmine.execute();
