import { workspace } from 'vscode';
import { getConfigEnable, getConfigTarget } from './config';
import { service } from './service';
import { SPXContentProvider } from './providers/SPXContentProvider';
import { VSCodeHTMLCustomData } from './data';

export function enable (this: SPXContentProvider) {

  if (getConfigEnable() === false) {
    workspace.getConfiguration('spx').update('enable', true, getConfigTarget());
    service.provider.data = service.data;
  }

}

export function disable (this: SPXContentProvider) {

  if (getConfigEnable() === true) {
    workspace.getConfiguration('spx').update('enable', false, getConfigTarget());
    service.provider.data = <VSCodeHTMLCustomData>{};
  }

}
