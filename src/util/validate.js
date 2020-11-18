// Run all of the validations
const validations = require("../validations.js");

const { log } = require("./logger.js");

module.exports = (options) => {
    Object.entries(options).forEach(([ key, value ]) => {
        if(typeof validations[key] !== "undefined") {
            return validations[key](value);
        }
    
        return log(`Ignoring unknown option "${key}"`);
    });

    return options;
};

