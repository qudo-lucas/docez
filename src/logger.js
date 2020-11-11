module.exports = {
    error(str) {
        console.log(`[ doc-ez ] 🚨 Error: ${str}`);
    },
    log(str) {
        console.log(`[ doc-ez ] ${str}`);
    },
    success() {
        console.log("[ doc-ez ] 🚀 Success!");
    },
};
