import { extensions } from 'vscode';

export async function literal () {

  const extension = extensions.getExtension('vscode.typescript-language-features');

  if (!extension) return;

  await extension.activate();

  if (!extension.exports || !extension.exports.getAPI) return;

  const api = extension.exports.getAPI(0);

  if (!api) return;

  api.configurePlugin('typescript-lit-html-plugin', {
    tags: [
      'this.dom',
      'spx.dom'
    ]
  });

}
