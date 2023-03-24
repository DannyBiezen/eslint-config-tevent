# eslint-plugin-tevent

ESLint config for Tevent

> Note that this project currently does not work due to build agent failures when including this plugin (it works fine locally). For now you will need to manually copy the packages and the config to your own project.

## Installation

You'll first need to install `eslint-plugin-tevent`:

```sh
yarn add -D eslint-plugin-tevent
```

## Usage

Add `tevent/recommended` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["tevent/recommended"]
}
```
