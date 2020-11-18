// Exist will throw an error if path doesn't exist
const exists = require("./util/exists.js");

module.exports = {
    output   : () => null,
    template : (value) => exists(value),
    markdown : (value) => exists(value),
    assets   : (value) => {
        // Check if custom value
        if(value !== "src/assets") {
            return exists(value);
        }
    },
};
