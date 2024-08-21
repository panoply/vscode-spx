import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [ './extension/index.ts' ],
  format: 'cjs',
  noExternal: [ '@typescript-eslint/typescript-estree' ],
  external: [ 'vscode' ]
});
