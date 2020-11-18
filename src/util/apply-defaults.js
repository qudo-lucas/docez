const defaults = require("../defaults.js");

module.exports = (options) => ({
    ...defaults,
    ...options,
});
