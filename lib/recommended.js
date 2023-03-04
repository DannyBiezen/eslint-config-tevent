/**
 * @fileoverview ESLint config for Tevent
 * @author tevent
 */
"use strict";

const baseConfig = require("./base");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...baseConfig,
  plugins: ["@typescript-eslint", "unicorn", "promise"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx", ".d.ts"],
    },
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
    "plugin:promise/recommended",
    "plugin:unicorn/recommended",
    "plugin:import/recommended",
    "prettier/prettier",
    "prettier", // Prettier should always be defined last as it will disable formatting rules.
  ],
  overrides: [
    {
      files: ["**/?(*.)+(test).[jt]s?(x)"],
      plugins: ["jest", "testing-library"],
      extends: ["plugin:jest/recommended", "plugin:jest/style"],
      rules: {
        "@typescript-eslint/unbound-method": "off", // This rule needs to be off for test files. jest/unbound-method will be enabled in it's place
        "jest/unbound-method": "error", // This rules knows when it's ok to pass an unbounded method to expect calls.
        "jest/prefer-called-with": "error", // Improve assertions and output.
        "jest/prefer-each": "error", // Improve test output when looping over test cases.
        "jest/prefer-equality-matcher": "error", // Improve assertions.
        // Make sure every test contains assertions.
        "jest/expect-expect": [
          "error",
          {
            assertFunctionNames: ["expect", "waitForElementToBeRemoved"], // Make sure these functions count as assertions.
            additionalTestBlockFunctions: [],
          },
        ],

        "testing-library/prefer-explicit-assert": "error", // Do not have dangling await screen.findByText queries - instead surround them with an expect().toBeDefined() to make it clear this is an assertion.
      },
    },
  ],
  rules: {
    "promise/prefer-await-to-then": "error", // Disable then/catch syntax and enforce await for consistency.

    "unicorn/switch-case-braces": "off", // Disabled as this rule doesn't provie real value and it results in extra added lines.
    "unicorn/better-regex": "off", // "Better" in this case is debatable; disabled as it doesn't provide real value.
    "unicorn/no-useless-undefined": "off", // rtk-query and default component props require the usage of undefined.
    "unicorn/prevent-abbreviations": "off", // trust developers to use correct naming, this rule gets annoying real fast.
    "unicorn/no-null": "off", // Fundementally disagree with this rule. Nulls should be allowed in the codebase as they are different from undefined. There are also loads of places in react and third-party libraries where null is expected to be passed in.
    "unicorn/filename-case": "off", // Might be worth deciding on a convention on casing for js-files, ReactComponents, variableNaming, etc. Not important atm so disabled to give developers more freedom.
    "unicorn/prefer-module": "off", // Module syntax is needed in some places.
    "unicorn/catch-error-name": "off", // Do not restrict catch variable naming.
    "unicorn/prefer-regexp-test": "off", // Allow string.match.
    "unicorn/prefer-query-selector": "off", // Prefer to be explicit about what selector is being used.

    "@typescript-eslint/no-empty-function": "off", // Allow empty functions.
    "@typescript-eslint/switch-exhaustiveness-check": "error", // Make sure to cover all cases in a switch statement, especially useful when refactoring.
    "@typescript-eslint/require-array-sort-compare": "error", // Always provide a compareFunction to prevent number arrays to be sorted like [1, 10, 2, 20, 3, 30]
    "@typescript-eslint/promise-function-async": "error", // Always add async when returning a function to make intent clear.
    // Always correctly await promises.
    "@typescript-eslint/no-floating-promises": [
      "error",
      {
        ignoreVoid: true, // Unless we explicitly ignore the result.
      },
    ],
    "@typescript-eslint/consistent-type-definitions": ["error", "type"], // Enforce consistency by always using types instead of interfaces.

    "import/no-deprecated": "error", // Don't depend on deprecated functions.
    "import/order": "off", // This causes unnecessary warnings, the order does not matter.
    "import/prefer-default-export": "off", // Default exports in combination with TypeScript make it very difficult to get correct intellisense when importing a default export.
    "import/no-named-as-default": "off", // Allow default imports to have a similar name as it's file name.
    "import/default": "off", // Unsure why this is causing errors.
    "import/no-unresolved": "off", // Should be enabled in a future PR - need to rename many files with 'git mv'.

    "array-callback-return": "error", // Prevent mistakes when calling array functions.
    "no-console": "off", // console logs are removed by the metro bundler. Keeping them in the codebase helps with debugging.
    "no-restricted-syntax": [
      // Taken from https://github.com/airbnb/javascript/blob/64b965efe0355c8290996ff5a675cd8fb30bf843/packages/eslint-config-airbnb-base/rules/style.js#L334-L352
      // Removed the ForOfStatement selector as it allows you to use break and continue inside these loops.
      "error",
      {
        selector: "ForInStatement",
        message:
          "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.",
      },
      {
        selector: "LabeledStatement",
        message:
          "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.",
      },
      {
        selector: "WithStatement",
        message:
          "`with` is disallowed in strict mode because it makes code impossible to predict and optimize.",
      },
    ],
    // Disallow void operators.
    "no-void": [
      "error",
      {
        allowAsStatement: true, // Allow void for statements as they are used to ignore floating promises.
      },
    ],
    // Don't allow parameter reassignments.
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: [
          "state", // This is used in redux reducers, you can directly modify these properties as redux-toolkit uses immer.js for immutability.
          "stateSlice", // This is used in redux-toolkit reducers, you can directly modify these properties as redux-toolkit uses immer.js for immutability.
          "telemetryItem", // AppInsights expects us to modify the telemetryItem directly.
          "cachedDataState", // This is used in rtk-query notification handlers, you can directly modify these properties as rtk-query uses immer.js for immutability.
        ],
      },
    ],

    // Standardizes test id values to be kebab-case.
    "testing-library/consistent-data-testid": [
      "error",
      {
        testIdAttribute: ["testID"],
        testIdPattern: "^[a-z]+(-[a-z]*)*$",
      },
    ],
  },
};
