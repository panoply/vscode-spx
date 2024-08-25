import { Disposable, workspace, RelativePattern, Uri } from 'vscode';
import { Model, WalkComponent } from '../parse/WalkComponent';
import { refineURI } from '../utils';

export class SPXComponents {

  public files: Map<string, Set<string>> = new Map();
  public model: Map<string, Model> = new Map();
  public schema: any = {};

  public async getUriFiles (files: string[], disposable: Disposable[]) {

    const baseUri = workspace?.workspaceFolders?.[0];

    if (baseUri) {
      for (const path of files) {

        const relative = new RelativePattern(baseUri, refineURI(path));

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
      const keys = WalkComponent(uri, read.toString(), this.model);

      this.files.set(uri.fsPath, keys);

    }
  }

  private onDeleteFile (uri: Uri) {

    if (this.files.has(uri.fsPath)) {

      const component = this.files.get(uri.fsPath);

      if (component) {
        for (const id of component) this.model.delete(id);
        this.files.delete(uri.fsPath);
      }
    }

  }

  private async onChangeFile (uri: Uri) {

    if (this.files.has(uri.fsPath)) {

      const read = await workspace.fs.readFile(uri);
      const ids = WalkComponent(uri, read.toString(), this.model);

      this.files.set(uri.fsPath, ids);

    }

  }

}
