# vscode-spx

Language and intelliSense support for the [SPX](https://spx.js.org) JavaScript/TypeScript framework. Provides syntax highlighting, directive completions and various enhancements those leveraging SPX in their projects.

### Key Features

- Syntax Highlighting for `spx-*` annotations in markup.
- Supports grammar targeting for highlight customizations.
- SPX Specific Directive Completions with descriptions
- Event Directive Completions with MDN descriptions.
- Component Completions with state defined referencing.

# Usage

The extension exposes an enabled/disable workspace settings which can be used to either activate or deactivate directive completions. Syntax highlighting is automatically applied using HTML grammar injections, as such all `spx-*` attribute occurrences within markup languages apply highlighting.

> Given the large data set applied to event directives, one may prefer to disable the extension when they are not working with SPX.

### Settings

The below workspace settings are made available:

<!-- prettier-ignore -->
```jsonc
{
  "spx.files": [], // Provide components glob for completions in markup files
  "spx.completion.directives": true   // Enable/Disable directive completions
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
