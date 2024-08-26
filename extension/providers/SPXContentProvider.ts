import { EventEmitter, TextDocumentContentProvider, Uri } from 'vscode';
import { VSCodeHTMLCustomData } from '../data';
import { service } from '../service';

export class SPXContentProvider implements TextDocumentContentProvider {

  onDidChangeEmitter = new EventEmitter<Uri>();
  onDidChange = this.onDidChangeEmitter.event;
  customData: VSCodeHTMLCustomData;
  uri: Uri;

  constructor (scheme: string) {
    this.uri = Uri.parse(scheme);
    this.customData = service.data;
  }

  get data () {
    return this.customData;
  }

  set data (newCustomdata) {
    this.customData = newCustomdata;
    this.onDidChangeEmitter.fire(this.uri);
  }

  provideTextDocumentContent (uri: Uri): string {

    if (uri.toString() !== this.uri.toString()) {
      throw new Error(uri.toString());
    }

    return JSON.stringify(this.customData);
  }

}
