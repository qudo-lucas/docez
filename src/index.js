#!/usr/bin/env node

/* eslint-disable max-statements */
const fs = require("fs-extra");

// Validation
const validate = require("./util/validate.js");

// Load config
const config = require("./config.js");

// Apply default options
const applyDefaults = require("./util/apply-defaults.js");

// Run build with config
const build = require("./build.js");

const { log, error, success } = require("./util/logger.js");

const configWithDefaults = applyDefaults(config);

const validatedConfig = validate(configWithDefaults);

build(validatedConfig);

// Log success message
success();
