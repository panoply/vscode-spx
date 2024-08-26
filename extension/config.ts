import { ConfigurationChangeEvent, ConfigurationTarget, DocumentFilter, workspace } from 'vscode';
import { service } from './service';
import { VSCodeHTMLCustomData } from './data';

export function getConfigTarget (): ConfigurationTarget {

  const target = workspace.getConfiguration('spx').inspect('enable');

  if (target?.workspaceValue) return ConfigurationTarget.Workspace;
  if (target?.workspaceFolderValue) return ConfigurationTarget.WorkspaceFolder;

  return ConfigurationTarget.Global;

}

export function getConfigEnable (): boolean {

  return workspace.getConfiguration('spx').get<boolean>('enable') || true;

}

export function getConfigFiles (): string[] {

  return workspace.getConfiguration('spx').get<string[]>('files') || [];

}

export function getConfigLanguages (): ReadonlyArray<DocumentFilter | string> {

  const files = workspace.getConfiguration('spx').get<string[]>('languages');
  const languages = [ 'html', 'liquid', ...files ];

  return languages
    .map(file => /^\./.test(file) ? file.slice(1) : file)
    .filter((file, i, a) => file.length > 1 ? a.indexOf(file) === i : false)
    .map(language => ({ scheme: 'file', language }));

}

export function onDidChangeConfiguration (event: ConfigurationChangeEvent) {

  if (event.affectsConfiguration('spx')) {

    const option = getConfigEnable();

    if (option === true) {
      service.provider.data = service.data;
      console.log('SPX Enabled');
    } else if (option === false) {
      service.provider.data = <VSCodeHTMLCustomData>{};
      console.log('SPX Disabled');
    }
  }

}
