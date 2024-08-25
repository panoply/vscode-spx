import { ConfigurationTarget, DocumentFilter, workspace } from 'vscode';

export function getConfigTarget (): ConfigurationTarget {

  const target = workspace.getConfiguration('spx').inspect('enable');

  if (target?.workspaceValue) return ConfigurationTarget.Workspace;
  if (target?.workspaceFolderValue) return ConfigurationTarget.WorkspaceFolder;

  return ConfigurationTarget.Global;

}

export function downcase (input: string) {

  return input[0].toLowerCase() + input.slice(1);

}

export function capitalize (input: string) {

  return input[0].toUpperCase() + input.slice(1);

}

export function kebabCase (input: string) {

  return input.replace(/([A-Z])/g, (_, v) => `-${v}`.toLowerCase());

}

export function getConfigEnable (): boolean {

  return workspace.getConfiguration('spx').get<boolean>('enable') || true;

}

export function getConfigFiles (): string[] {

  return workspace.getConfiguration('spx').get<string[]>('files') || [];

}

export function getConfigLanguages (): ReadonlyArray<DocumentFilter | string> {

  const files = workspace.getConfiguration('spx').get<string[]>('languages');

  return [ 'html', 'liquid', ...files ]
    .map(file => /^\.$/.test(file) ? file.slice(1) : file)
    .filter((file, i, a) => file.length > 1 ? a.indexOf(file) === i : false)
    .map(language => ({ scheme: 'file', language }));

}

export function slash (path: string) {

  const isExtendedLengthPath = path.startsWith('\\\\?\\');

  if (isExtendedLengthPath) return path;

  return path.replace(/\\/g, '/');

}

export function refineURI (filePath: string) {

  return slash(filePath).replace(/^\.?\//, '');

}
