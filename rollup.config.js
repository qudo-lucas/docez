import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

import json from "@rollup/plugin-json";

const pkg = require("./package.json");

export default {
    input  : "src/index.js",
    output : {
        sourcemap : true,
        format    : "iife",
        name      : "docez",
        file      : pkg.main,
        banner    : "#!/usr/bin/env node",
    },
    plugins : [
        resolve({ preferBuiltins : true }),
        commonjs(),
        json(),
    ],
};
