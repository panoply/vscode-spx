<br>
<p align="center">
<a href="https://spx.js.org">
<img src="https://raw.githubusercontent.com/panoply/spx/13d4440296f86ca276c7de7b710dcd714f69b94f/docs/site/assets/svg/logo.svg"
width="160px">
</a>
</p>
<h1></h1>

# vscode-spx

Language and intelliSense support for the [SPX](https://spx.js.org) JavaScript/TypeScript framework. Provides syntax highlighting, directive completions and various enhancements those leveraging SPX in their projects.

### Key Features

- Syntax Highlighting for `spx-*` annotations in markup.
- Supports grammar targeting for highlight customizations.
- SPX Specific Directive Completions with descriptions
- Event Directive Completions with MDN descriptions.
- Component Completions with state defined referencing.

# Usage

The extension requires users to signal that they using SPX in their project using the `spx.enable` contribution setting. Syntax highlighting is automatically applied via HTML grammar injection to all `spx-*` attribute occurrences within markup languages. Directive completions will also be applied accordingly.

> Given the large data set applied to event directives, one may prefer to disable the extension when they are not working with SPX.

### Settings

The below workspace settings are made available:

<!-- prettier-ignore -->
```jsonc
{
  "spx.enable": true,       // Enable/Disable the extension
  "spx.completions": true   // Enable/Disable completions
}
```

# Contributing

Contributions are welcome! This project uses [pnpm](https://pnpm.js.org/en/cli/install) for package management and is written in TypeScript.

1. Ensure pnpm is installed globally `npm i pnpm -g`
2. Leverage `pnpm env` if you need to align node versions
3. Clone this repository `git clone https://github.com/panoply/vscode-spx.git`
4. Run `pnpm i` in the root directory
5. Run `pnpm dev` for development mode

### Developing

The project uses [tsup](https://tsup.egoist.sh) for producing the distributed bundle. You can produce a VSIX by running the `pnpm build` command. The `.vscode/launch.json` file contains the extension host logic.

```bash
pnpm dev         # Development in watch mode
pnpm build       # Builds extension and packages VSIX
pnpm data        # Generates the html-data schema files
```

# Support

Follow me on [X](https://twitter.com/niksavvidis) and say hello! Thought there is no obligation, but coffee is always appreciated.

**PayPal**: [Donate](https://www.paypal.me/paynicos)<br>
**BTC**: `35wa8ChA5XvzfFAn5pMiWHWg251xDqxT51`

<br>

🥛 <small>[Νίκος Σαβίδης](mailto:n.savvidis@gmx.com)</small>

# License

Licensed under [MIT](/LICENSE)
