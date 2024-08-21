import { ConfigurationTarget, workspace } from 'vscode';

export function getConfigTarget (key: string = 'completion.directives'): ConfigurationTarget {

  const target = workspace.getConfiguration('spx').inspect(key);

  if (target?.workspaceValue) return ConfigurationTarget.Workspace;
  if (target?.workspaceFolderValue) return ConfigurationTarget.WorkspaceFolder;

  return ConfigurationTarget.Global;

}

export function kebabCase (input: string) {

  return input.replace(/([A-Z])/g, (_, v) => `-${v}`.toLowerCase());

}

export function getConfigOption (key: string = 'completion.directives'): boolean {

  return workspace.getConfiguration('spx').get<boolean>(key) || true;

}

export function getConfigFiles (): string[] {

  return workspace.getConfiguration('spx').get<string[]>('files') || [];

}

export function slash (path: string) {

  const isExtendedLengthPath = path.startsWith('\\\\?\\');

  if (isExtendedLengthPath) return path;

  return path.replace(/\\/g, '/');

}

export function refineURI (filePath: string) {

  return slash(filePath).replace(/^\.?\//, '');

}
