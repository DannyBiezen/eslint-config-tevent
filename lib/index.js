/**
 * @fileoverview ESLint config for Tevent
 * @author tevent
 */

"use strict";
const configRecommended = require("./recommended");
const configReact = require("./react");
const configReactNative = require("./react-native");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  configs: {
    recommended: configRecommended,
    react: configReact,
    "react-native": configReactNative,
  },
};
