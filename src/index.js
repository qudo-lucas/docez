/* eslint-disable max-statements */
const fs = require("fs-extra");
const format = require("html-format");

const buildTree = require("./build-tree.js");
const buildPage = require("./build-page.js");
const { log, error, success } = require("./logger.js");

const formatHtml = (str) => format(str, " ".repeat(4), 20);

const link = () => log("For more information visit https://github.com/qudo-lucas/docez");

const validate = (input, output) => {
    if(!input) {
        error("No input directory provided.");
        link();

        return false;
    }
    
    if(!output) {
        error("No output directory provided.");
        link();

        return false;
    }
    
    if(!fs.existsSync(`${process.cwd()}/${input}`)) {
        error(`Input directory "${input}" does not exist.`);
        link();

        return false;
    }

    if(!fs.existsSync(`${process.cwd()}/${output}`)) {
        error(`Output directory "${output}" does not exist.`);
        link();

        return false;
    }

    if(!fs.existsSync(`${process.cwd()}/${input}/sections`)) {
        error(`${input}/sections does not exist.`);
        link();

        return false;
    }

    if(!fs.existsSync(`${process.cwd()}/${input}/template.html`)) {
        error(`${input}/template.html does not exist.`);
        link();

        return false;
    }

    return true;
};

module.exports = (input, output) => {
    if(!validate(input, output)) {
        return;
    }
    
    // Recursively build a tree similar to the provided directory.
    // This tree will contain the rendered html for each .md file.
    const tree = buildTree(`${input}/sections`);

    // Walk the tree,
    // build the nav html and the content html
    // to inject into the template.
    const html = buildPage(tree);

    // Load template and inject values
    const templatePath = `${process.cwd()}/${input}/template.html`;
    const templateFile = fs.readFileSync(templatePath);

    let template = templateFile.toString();

    template = template.replace("{NAV}", html.nav);
    template = template.replace("{CONTENT}", html.content);

    const result = formatHtml(template);

    const outputDir = `${process.cwd()}/${output}`;

    fs.ensureDirSync(outputDir);

    // Write index.html
    fs.writeFileSync(`${outputDir}/index.html`, result);

    // Copy assets
    fs.copySync(`${process.cwd()}/${input}/assets`, `${process.cwd()}/${output}`);

    success();
};
