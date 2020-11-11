#!/usr/bin/env node
const docEz = require("../dist");

const [ , , input, output, ...options ] = process.argv;

docEz(input, output);
