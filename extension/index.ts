import { ExtensionContext, workspace, commands, EventEmitter, Uri, TextDocumentContentProvider, ConfigurationTarget } from 'vscode';
import data from './data';

class CustomData implements TextDocumentContentProvider {

  // emitter and its event
  onDidChangeEmitter = new EventEmitter<Uri>();
  onDidChange = this.onDidChangeEmitter.event;
  uri: Uri;

  private schema = {};

  constructor (schema: any) {
    this.uri = Uri.parse('customData:/data.json');
    this.data = schema;
  }

  get data () {
    return this.schema;
  }

  set data (data: any) {
    this.schema = data;
    this.onDidChangeEmitter.fire(this.uri);
  }

  provideTextDocumentContent (uri: Uri): string {

    if (uri.toString() !== this.uri.toString()) {
      throw new Error(uri.toString());
    }

    // provide joint custom element data
    return JSON.stringify(this.data);
  }

}

function getConfigTarget (key: string = 'completion.directives'): ConfigurationTarget {

  const target = workspace.getConfiguration('spx').inspect(key);

  if (target?.workspaceValue) return ConfigurationTarget.Workspace;
  if (target?.workspaceFolderValue) return ConfigurationTarget.WorkspaceFolder;

  return ConfigurationTarget.Global;

}

function getConfigOption (key: string = 'completion.directives'): boolean {

  return workspace.getConfiguration('spx').get<boolean>(key) || true;

}

/**
 * SPX Extension
 */
export async function activate (context: ExtensionContext) {

  const schema = workspace.getConfiguration('spx').get('completion.directives') ? data : {};
  const customData = new CustomData(schema);
  const provider = workspace.registerTextDocumentContentProvider('customData', customData);

  const enable = commands.registerCommand('spx.enableCompletions', () => {
    if (getConfigOption() === false) {
      workspace.getConfiguration('spx').update('completion.directives', true, getConfigTarget());
      customData.data = data;
    }
  });

  const disable = commands.registerCommand('spx.disableCompletions', () => {
    if (getConfigOption() === true) {
      workspace.getConfiguration('spx').update('completion.directives', false, getConfigTarget());
      customData.data = {};
    }
  });

  const onConfig = workspace.onDidChangeConfiguration((event) => {

    if (event.affectsConfiguration('spx')) {

      const option = getConfigOption();

      if (option === true) {
        customData.data = data;
        console.log('SPX Completions Enabled');
      } else if (option === false) {
        customData.data = {};
        console.log('SPX Completions Disabled');
      }
    }

  });

  context.subscriptions.push(
    enable,
    disable,
    onConfig,
    provider
  );

}
