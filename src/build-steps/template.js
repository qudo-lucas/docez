const fs = require("fs-extra");
const format = require("html-format");

const formatHtml = (str) => format(str, " ".repeat(4), 20);

module.exports = ({ template : templatePath, output }, { nav : navHTML, content : contentHTML }) => {
    // Load template and inject values
    const fullPath = `${process.cwd()}/${templatePath}`;
    const templateFile = fs.readFileSync(fullPath);

    let template = templateFile.toString();

    template = template.replace("{NAV}", navHTML);
    template = template.replace("{CONTENT}", contentHTML);

    const result = formatHtml(template);

    // Write index.html
    fs.writeFileSync(`${output}/index.html`, result);

    return template;
};
