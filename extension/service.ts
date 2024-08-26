import { Disposable, workspace, RelativePattern, Uri, MarkdownString } from 'vscode';
import { Model, WalkComponent } from './parse/WalkComponent';
import { capitalize, refineURI } from './shared/utils';
import { getConfigFiles, getConfigEnable } from './config';
import { Attribute, data, VSCodeHTMLCustomData } from './data';
import { SPXContentProvider } from './providers/SPXContentProvider';
import { merge } from './shared/merge';

interface Service {
  /**
   * Activates Service Handler
   */
  (): Promise<void>;
  /**
   * Whether or not service was activated
   */
  activated: boolean;
  /**
   * The TextDocumentContentProvider registration instance made available
   * via {@link SPXContentProvider} class. This will be used by {@link getCustomData}.
   */
  provider: SPXContentProvider;
  /**
   * Sets custom data component (state) attributes which are made available
   * via the {@link SPXContentProvider} TextDocumentContentProvider.
   */
  getCustomData(): void;
  /**
   * Component files store. The `Map` keys are {@link Uri.fsPath} references
   * of Component files in the workspace and the `Map` value `Set` will hold
   * contain the component identifiers keys.
   *
   * The `service.model` store is a `Map` and each value in the files `Set`
   * will point to keys in the `service.model`.
   */
  files: Map<string, Set<string>>;
  /**
   * The generated parse models which describe each component and will be used
   * to provide language features. The `Map` keys are component identifier names
   * and the values hold workable representations of the a component.
   */
  model: Map<string, Model>;
  /**
   * Hold an immutable reference to the SPX Custom Data.
   */
  data: VSCodeHTMLCustomData;
  /**
   * Context Disposables
   */
  readonly disposable?: Disposable[];
}

export const service: Service = async function Service () {

  const enable = getConfigEnable();
  const files = getConfigFiles();

  if (service.activated) {
    service.files.clear();
    service.model.clear();
  } else {
    service.activated = true;
  }

  if (!enable) return; // no need to proceed is extension is disabled.

  const baseUri = workspace?.workspaceFolders?.[0];

  if (baseUri) {
    for (const path of files) {

      const relative = new RelativePattern(baseUri, refineURI(path));

      await findFiles(relative);

      const watch = workspace.createFileSystemWatcher(relative);

      watch.onDidCreate(onCreateComponentFile, null, service.disposable);
      watch.onDidChange(onChangeComponentFile, null, service.disposable);
      watch.onDidDelete(onDeleteComponentFile, null, service.disposable);

    }
  }

};

service.activated = false;
service.files = new Map();
service.model = new Map();
service.getCustomData = getCustomData;
service.data = null;
service.provider = null;

async function findFiles (relative: RelativePattern) {

  const files = await workspace.findFiles(relative);

  if (files) {
    for (const uri of files) {
      if (!service.files.has(uri.fsPath)) {
        await onCreateComponentFile(uri);
      }
    }
  }
}

function getCustomData () {

  const attributes: Attribute[] = [];

  for (const { label, uri, className, states } of service.model.values()) {

    for (const state of states.values()) {

      const description = new MarkdownString()
        .appendMarkdown(`**${className} State**\n\n`)
        .appendMarkdown(`Type: \`${state.valueType}\` (default: \`${state.valueDefault}\`)`)
        .appendCodeblock(`this.state.${label}\nthis.state.has${capitalize(label)}`, 'js')
        .value;

      const attribute: Attribute = {
        name: `spx-${label}:${state.markupName}`,
        description,
        references: [
          {
            name: `${className} Component`,
            url: uri.fsPath
          }
        ]
      };

      if (state.valueType === 'boolean') {
        attribute.valueSet = 'boolean';
      } else if (state.valueType === 'array') {
        attribute.values = [
          {
            name: '[]',
            description: `The ${state.name} expects an array value.`
          }
        ];
      } else if (state.valueType === 'object') {
        attribute.values = [
          {
            name: '{}',
            description: `The ${state.name} expects an \`object\` value.`
          }
        ];
      } else if (state.valueType === 'string' && state.valueLiteral !== null) {
        attribute.values = state.valueLiteral.map(name => ({ name }));
      }

      attributes.push(attribute);

    }

  }

  service.data = merge(data, {
    globalAttributes: globals => [
      ...attributes,
      ...globals
    ]
  });

  if (service.provider !== null) {

    service.provider.data = service.data;

  }

}

async function onCreateComponentFile (uri: Uri) {
  if (uri.fsPath.endsWith('.ts') || uri.fsPath.endsWith('.js')) {

    const read = await workspace.fs.readFile(uri);
    const keys = WalkComponent(uri, read.toString(), service.model);

    service.files.set(uri.fsPath, keys);
    service.getCustomData();

  }
}

async function onChangeComponentFile (uri: Uri) {

  if (service.files.has(uri.fsPath)) {

    const read = await workspace.fs.readFile(uri);
    const ids = WalkComponent(uri, read.toString(), service.model);

    service.files.set(uri.fsPath, ids);
    service.getCustomData();
  }

}

function onDeleteComponentFile (uri: Uri) {

  if (service.files.has(uri.fsPath)) {

    const component = service.files.get(uri.fsPath);

    if (component) {

      for (const id of component) service.model.delete(id);

      service.files.delete(uri.fsPath);
      service.getCustomData();

    }
  }

}
