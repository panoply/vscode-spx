import {
  ExtensionContext,
  workspace,
  commands,
  languages
} from 'vscode';
import * as util from './utils';
import data from './providers/data';
import { SPXCompletions } from './providers/SPXCompletions';
import { SPXSchemaContent } from './providers/SPXSchemaContent';

/**
 * SPX Extension
 */
export async function activate (context: ExtensionContext) {

  const enable = workspace.getConfiguration('spx').get<boolean>('enable');
  const schema = enable ? data : {};
  const customData = new SPXSchemaContent(schema);
  const components = new SPXCompletions(customData.data);
  const files = util.getConfigFiles();

  await components.getUriFiles(files, context.subscriptions);

  const onEnable = commands.registerCommand('spx.enable', () => {
    if (util.getConfigEnable() === false) {
      workspace.getConfiguration('spx').update('enable', true, util.getConfigTarget());
      customData.data = data;
    }
  });

  const onDisable = commands.registerCommand('spx.disable', () => {
    if (util.getConfigEnable() === true) {
      workspace.getConfiguration('spx').update('enable', false, util.getConfigTarget());
      customData.data = {};
    }
  });

  const onProvider = workspace.registerTextDocumentContentProvider('customData', customData);

  const onComplete = languages.registerCompletionItemProvider(
    [
      {
        scheme: 'file',
        language: 'html'
      },
      {
        scheme: 'file',
        language: 'liquid'
      }
    ],
    components,
    '.',
    '"',
    '-',
    ' ',
    ':'
  );

  const onConfig = workspace.onDidChangeConfiguration((event) => {

    if (event.affectsConfiguration('spx')) {

      const option = util.getConfigEnable();

      if (option === true) {
        customData.data = data;
        console.log('SPX Enabled');
      } else if (option === false) {
        customData.data = {};
        console.log('SPX Disabled');
      }
    }

  });

  context.subscriptions.push(
    onEnable,
    onDisable,
    onConfig,
    onComplete,
    onProvider
  );

}
