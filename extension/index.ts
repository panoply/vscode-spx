import {
  ExtensionContext,
  workspace,
  commands,
  languages
} from 'vscode';
import { SPXCompletionProvider } from './providers/SPXCompletionProvider';
import { SPXContentProvider } from './providers/SPXContentProvider';
import { TRIGGERS } from './shared/const';
import { SPXHoverProvider } from './providers/SPXHoverProvider';
import { service } from './service';
import { getConfigLanguages, onDidChangeConfiguration } from './config';
import { disable, enable } from './commands';
import { contributes } from '../package.json';

/**
 * SPX Extension
 */
export async function activate (context: ExtensionContext) {

  if (!('disposable' in service)) {
    Object.defineProperty(service, 'disposable', {
      get () {
        return context.subscriptions;
      }
    });
  }

  await service();

  service.provider = new SPXContentProvider(contributes.html.customData[0]);
  const CompletionItemProvider = new SPXCompletionProvider();
  const HoverProvider = new SPXHoverProvider();

  context.subscriptions.push(
    commands.registerCommand('spx.enable', enable),
    commands.registerCommand('spx.disable', disable),
    workspace.onDidChangeConfiguration(onDidChangeConfiguration),
    workspace.registerTextDocumentContentProvider('customData', service.provider),
    languages.registerCompletionItemProvider(getConfigLanguages(), CompletionItemProvider, ...TRIGGERS),
    languages.registerHoverProvider(getConfigLanguages(), HoverProvider)
  );

}
