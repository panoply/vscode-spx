import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [ './extension/index.ts' ],
  format: 'cjs',
  noExternal: [
    '@typescript-eslint/typescript-estree',
    'typescript-lit-html-plugin'
  ],
  external: [ 'vscode' ]
});
