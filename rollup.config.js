import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

import json from "@rollup/plugin-json";

export default {
    input  : "src/index.js",
    output : {
        sourcemap : true,
        format    : "cjs",
        name      : "doc-ez",
        file      : "dist/index.js",
    },
    plugins : [
        resolve(),
        commonjs(),
        json(),
    ],
};
