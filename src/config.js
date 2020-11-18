const CONFIG_PATH = `${process.cwd()}/docez.config.js`;

let config = {};

try {
    config = require(CONFIG_PATH);
} catch(ex) {}

module.exports = config;
