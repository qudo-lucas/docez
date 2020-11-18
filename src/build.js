const fs = require("fs-extra");

// Build steps
const generateTree = require("./build-steps/tree.js");
const generateHTML = require("./build-steps/html.js");
const generateBundle = require("./build-steps/generate-bundle.js");
const buildTemplate = require("./build-steps/template.js");
const compileSCSS = require("./build-steps/scss.js");
const copyAssets = require("./build-steps/copy-assets.js");

module.exports = (options) => {
    if(options.output) {
        fs.ensureDirSync(`${process.cwd()}/${options.output}`);
    }

    // Recursively build a tree similar to the provided directory.
    // This tree will contain the rendered html for each .md file.
    const tree = generateTree(options);

    // Walk the tree,
    // build the nav html and the content html
    // to inject into the template.
    const html = generateHTML(tree);

    // Inject html into template
    const template = buildTemplate(options, html);

    // // Generate bundle if user provided an entrypoint or rollup config
    // const bundle = generateBundle(options);

    // // Compile CSS if user provided SCSS entrypoint
    // const css = compileSCSS(options);

    // Lastly copy asset directory if provided
    copyAssets(options);
};
