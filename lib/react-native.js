/**
 * @fileoverview ESLint config for Tevent
 * @author tevent
 */
"use strict";

const baseConfig = require("./base");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...baseConfig,
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    "plugin:react/recommended",
    "@react-native-community",
    "plugin:react-native-a11y/all",
  ],
  rules: {
    "react-native/no-inline-styles": "off", // Allow inline-styles.

    "react/jsx-no-leaked-render": "error", // Prevent potential issues with rendering components.
    // Make sure the style prop is always set as an object.
    "react/style-prop-object": [
      "error",
      {
        allow: ["StatusBar"], // Except for these components as they expect a string value as it's style prop.
      },
    ],
    // Enabling this rule make it more difficult to understand what a variable is refering to.
    // const bottomSheetContext = useContext(BottomSheetContext); vs
    // const { setBottomSheet } = useContext(BottomSheetContext);
    "react/destructuring-assignment": "off",
    // Use default arguments instead of PropTypes
    "react/require-default-props": [
      "error",
      {
        functions: "defaultArguments",
      },
    ],
    "react/jsx-props-no-spreading": "off", // Allow component prop spreading to make it easier to reuse the same props for multiple components.
  },
  overrides: [
    {
      files: ["**/?(*.)+(test).[jt]s?(x)"],
      plugins: ["testing-library"],
      extends: ["plugin:testing-library/react"],
    },
  ],
};
