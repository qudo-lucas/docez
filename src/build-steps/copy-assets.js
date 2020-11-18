const fs = require("fs-extra");

const exists = require("../util/exists.js");

// Copy assets
module.exports = ({ assets, output }) => {
    const fullPath = `${process.cwd()}/${assets}`;

    if(exists(assets, { sendError : false })) {
        fs.copySync(fullPath, `${process.cwd()}/${output}/public`);
    }
};
