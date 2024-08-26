import { CancellationToken, Hover, HoverProvider, MarkdownString, Position, TextDocument } from 'vscode';
import { service } from '../service';

export class SPXHoverProvider implements HoverProvider {

  /**
   * Provide a hover for the given position and document. Multiple hovers at the same
   * position will be merged by the editor. A hover can have a range which defaults
   * to the word range at the position when omitted.
   *
   * @param document The document in which the command was invoked.
   * @param position The position at which the command was invoked.
   * @param token A cancellation token.
   * @return A hover or a thenable that resolves to such. The lack of a result can be
   * signaled by returning `undefined` or `null`.
   */
  async provideHover (textDocument: TextDocument, position: Position, _token: CancellationToken): Promise<Hover> {

    const range = textDocument.getWordRangeAtPosition(position);
    const word = textDocument.getText(range);

    if (service.model.has(word)) {

      const { className, uri, events, states, nodes } = service.model.get(word);
      const contents = new MarkdownString()
        .appendMarkdown(`**[${className} Component](${uri.fsPath})**\n\n`)
        .appendMarkdown('SPX Component consists of the following:\n\n')
        .appendMarkdown(`- \`${states.size}\` State Reference${states.size === 1 ? '' : 's'}\n`)
        .appendMarkdown(`- \`${events.size}\` Event Method${events.size === 1 ? '' : 's'}\n`)
        .appendMarkdown(`- \`${nodes.size}\` DOM Node${nodes.size === 1 ? '' : 's'}\n`);

      return new Hover(contents);

    }

    return null;

  }

}
