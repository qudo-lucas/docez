/* eslint-disable no-console */
const { name } = require("../../package.json");

const link = () => console.log("For more information visit https://github.com/qudo-lucas/docez");

module.exports = {
    error(str) {
        const error = new Error(`[ ${name} ] 🚨 Error: ${str} \n ${link()}`);
        
        throw(error);
    },
    log(str) {
        console.log(`[ ${name} ] ${str}`);
    },
    success() {
        console.log(`[ ${name} ] 🚀 Success!`);
    },
};
