import { EventEmitter, TextDocumentContentProvider, Uri } from 'vscode';

export class SPXSchemaContent implements TextDocumentContentProvider {

  // emitter and its event
  onDidChangeEmitter = new EventEmitter<Uri>();
  onDidChange = this.onDidChangeEmitter.event;
  uri: Uri;

  private schema = {};

  constructor (schema: any) {
    this.uri = Uri.parse('customData:/spx.json');
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
