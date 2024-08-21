import {
  ExtensionContext,
  workspace,
  commands,
  EventEmitter,
  Uri,
  TextDocumentContentProvider,
  RelativePattern,
  languages,
  CompletionItem,
  CompletionItemKind,
  CompletionItemProvider,
  Position,
  TextDocument,
  Disposable
} from 'vscode';

import * as util from './utils';
import data from './data';
import { Model, parseComponent } from './parse';

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

class Components {

  public files: Map<string, Set<string>> = new Map();
  public cache: Map<string, Model> = new Map();

  public async getUriFiles (files: string[], disposable: Disposable[]) {

    const baseUri = workspace?.workspaceFolders?.[0];

    if (baseUri) {
      for (const path of files) {

        const relative = new RelativePattern(baseUri, util.refineURI(path));

        await this.findFiles(relative);

        const watch = workspace.createFileSystemWatcher(relative);

        watch.onDidCreate(this.onCreateFile, this, disposable);
        watch.onDidChange(this.onChangeFile, this, disposable);
        watch.onDidDelete(this.onDeleteFile, this, disposable);

      }
    }
  }

  private async findFiles (relative: RelativePattern) {

    const files = await workspace.findFiles(relative);

    if (files) {
      for (const uri of files) {
        if (!this.files.has(uri.fsPath)) {
          await this.onCreateFile(uri);
        }
      }
    }
  }

  private async onCreateFile (uri: Uri) {
    if (uri.fsPath.endsWith('.ts') || uri.fsPath.endsWith('.js')) {

      const read = await workspace.fs.readFile(uri);
      const ids = parseComponent(read.toString(), this.cache);

      this.files.set(uri.fsPath, ids);

    }
  }

  private onDeleteFile (uri: Uri) {

    if (this.files.has(uri.fsPath)) {

      const component = this.files.get(uri.fsPath);

      if (component) {
        for (const id of component) this.cache.delete(id);
        this.files.delete(uri.fsPath);
      }
    }

  }

  private async onChangeFile (uri: Uri) {

    if (this.files.has(uri.fsPath)) {

      const read = await workspace.fs.readFile(uri);
      const ids = parseComponent(read.toString(), this.cache);

      this.files.set(uri.fsPath, ids);

    }

  }

}

class Completions extends Components implements CompletionItemProvider {

  async provideCompletionItems (textDocument: TextDocument, position: Position): Promise<undefined|CompletionItem[]> {

    const value = textDocument.lineAt(position).text.slice(0, position.character);
    const index = value.lastIndexOf('spx');

    if (index === -1) return [];

    const attr = value.slice(index);

    if (/spx-.*?:$/.test(attr)) {

      for (const [ component, records ] of this.cache) {

        if (!attr.endsWith(`spx-${component}:`)) continue;

        return records.stateKeys.map(label => new CompletionItem(
          label,
          CompletionItemKind.Property
        ));

      }

    } else if (attr.endsWith('spx-')) {

      return [ ...this.cache.keys() ].map(label => new CompletionItem(label, CompletionItemKind.Class));

    } else if (/spx@.*?=".*?$/.test(attr)) {

      if (attr.endsWith('="') || /[ |,]$/.test(attr)) {

        return [ ...this.cache.keys() ].map(label => new CompletionItem(label, CompletionItemKind.Class));

      } else if (attr.endsWith('.')) {

        for (const [ component, records ] of this.cache) {

          if (!attr.endsWith(`${component}.`)) continue;

          return records.eventRefs.map(label => new CompletionItem(
            label,
            CompletionItemKind.Property
          ));

        }

      }

    } else if (/spx-node=".*?$/.test(attr)) {

      if (attr.endsWith('="') || /[ |,]$/.test(attr)) {

        return [ ...this.cache.keys() ].map(label => new CompletionItem(label, CompletionItemKind.Class));

      } else if (attr.endsWith('.')) {

        for (const [ component, records ] of this.cache) {

          if (!attr.endsWith(`${component}.`)) continue;

          return records.nodeNames.map(label => new CompletionItem(
            label,
            CompletionItemKind.Reference
          ));

        }
      }
    }

    return undefined;
  }

  resolveCompletionItem (item: CompletionItem) {

    return item;

  }

}

/**
 * SPX Extension
 */
export async function activate (context: ExtensionContext) {

  const schema = workspace.getConfiguration('spx').get('completion.directives') ? data : {};
  const customData = new CustomData(schema);
  const onProvider = workspace.registerTextDocumentContentProvider('customData', customData);
  const components = new Completions();
  const files = util.getConfigFiles();

  await components.getUriFiles(files, context.subscriptions);

  const enable = commands.registerCommand('spx.enableCompletions', () => {
    if (util.getConfigOption() === false) {
      workspace.getConfiguration('spx').update('completion.directives', true, util.getConfigTarget());
      customData.data = data;
    }
  });

  const disable = commands.registerCommand('spx.disableCompletions', () => {
    if (util.getConfigOption() === true) {
      workspace.getConfiguration('spx').update('completion.directives', false, util.getConfigTarget());
      customData.data = {};
    }
  });

  const onComplete = languages.registerCompletionItemProvider(
    { pattern: '**/*.{html,liquid}' },
    components,
    '.',
    '"',
    '-',
    ':'
  );

  const onConfig = workspace.onDidChangeConfiguration((event) => {

    if (event.affectsConfiguration('spx')) {

      const option = util.getConfigOption();

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
    onComplete,
    onProvider
  );

}
