/*
    If you got here, then you probably know what you're doing.
    If you have any questions,
    here's a link to the documentation (https://qudo-lucas.github.io/docez--template/),
    or feel free to reach out to me on Twitter @qudolucas.
*/

const INPUT_DIR = "src";
const OUTPUT_DIR = "docs";

// Using defaults
module.exports = {
    output   : OUTPUT_DIR,
    template : `${INPUT_DIR}/template.html`,
    markdown : `${INPUT_DIR}/markdown`,
    assets   : `${INPUT_DIR}/assets`,
};
