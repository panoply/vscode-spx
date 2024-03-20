import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [ './extension/index.ts' ],
  format: 'cjs',
  external: [ 'vscode' ]
});
