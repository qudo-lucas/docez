const fs = require("fs-extra");

const { error } = require("./logger.js");

module.exports = (relativePath, { sendError = true } = {}) => {
    const fullPath = `${process.cwd()}/${relativePath}`;

    if(!fs.existsSync(fullPath)) {
        if(sendError) {
            return error(`Path ${fullPath} could not be located.`);
        }
        
        return false;
    }

    return true;
};
