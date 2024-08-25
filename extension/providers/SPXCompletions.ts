import { CompletionItemProvider, TextDocument, Position, CompletionItem, CompletionItemKind, MarkdownString, CancellationToken, ProviderResult, SnippetString } from 'vscode';
import { capitalize } from '../utils';
import { SPXComponents } from './SPXComponents';

export class SPXCompletions extends SPXComponents implements CompletionItemProvider {

  constructor (data: any) {
    super();
    this.schema = data;
  }

  async provideCompletionItems (textDocument: TextDocument, position: Position): Promise<undefined|CompletionItem[]> {

    const value = textDocument.lineAt(position).text.slice(0, position.character);
    const index = value.lastIndexOf('spx');

    if (index === -1) return [];

    const attr = value.slice(index);
    const inAttr = attr.endsWith('spx-component="');

    if (attr.endsWith('spx-') || /spx-[a-z]+$/.test(attr) || inAttr) {

      const completions: CompletionItem[] = [];

      for (const { name, uri, className, events, nodes, states } of this.model.values()) {

        const s = [
          states.size === 0 ? '~~' : '',
          events.size === 0 ? '~~' : '',
          nodes.size === 0 ? '~~' : ''
        ];

        completions.push({
          label: name,
          detail: `spx-${name}`,
          kind: CompletionItemKind.TypeParameter,
          documentation: new MarkdownString([
             `**[${className} Component](${uri.fsPath})**\n`,
             `- ${s[0]}\`${states.size}\` State Reference${states.size === 1 ? '' : 's'}${s[0]}`,
             `- ${s[1]}\`${events.size}\` Event Method${events.size === 1 ? '' : 's'}${s[1]}`,
             `- ${s[2]}\`${nodes.size}\` DOM Node${states.size === 1 ? '' : 's'}${s[2]}`
          ].join('\n'))
        });

      }

      return completions;

    } else if (/spx-.*?:$/.test(attr)) {

      for (const [ component, records ] of this.model) {

        if (!attr.endsWith(`spx-${component}:`)) continue;

        const completions: CompletionItem[] = [];

        for (const {
          markupName,
          valueType,
          valueDefault,
          valueLiteral,
          name
        } of this.model.get(component).states.values()) {

          let insertText: SnippetString;

          if (valueType === 'boolean') {
            insertText = new SnippetString(`${markupName}="$\{1|true,false|}"$0`);
          } else if (valueType === 'array') {
            insertText = new SnippetString(`${markupName}="[ $1 ]"$0`);
          } else if (valueType === 'object') {
            insertText = new SnippetString(`${markupName}="{ $1 }"$0`);
          } else if (valueType === 'string') {
            if (valueLiteral !== null) {
              insertText = new SnippetString(`${markupName}="$\{1|${valueLiteral.join(',')}|}"$0`);
            } else {
              insertText = new SnippetString(`${markupName}="$1"$0`);
            }
          } else {
            insertText = new SnippetString(`${markupName}="$1"$0`);
          }

          completions.push({
            label: markupName,
            detail: `spx-${component}:${markupName}="${valueType}"`,
            kind: CompletionItemKind.Value,
            insertText,
            documentation: new MarkdownString([
              `**[${records.className} Component](${records.uri.fsPath})**\n`,
              `Type: \`${valueType}\` (default: \`${valueDefault}\`)`,
              '```js',
              `this.state.${name}`,
              `this.state.has${capitalize(name)}`,
              '```\n\n'
            ].join('\n'))
          });

        }

        return completions;

      }

    } else if (/spx@.*?=".*?$/.test(attr)) {

      if (attr.endsWith('="') || /[ |,]$/.test(attr)) {

        const completions: CompletionItem[] = [];

        for (const {
          className,
          uri,
          name,
          events
        } of this.model.values()) {

          completions.push({
            label: name,
            detail: `spx${attr.slice(attr.lastIndexOf('@'), attr.lastIndexOf('='))}="${name}.<method>"`,
            kind: CompletionItemKind.Value,
            documentation: new MarkdownString([
              `**[${className} Component](${uri.fsPath})**\n`,
              `${events.size} available method${events.size > 1 ? 's' : ''}`
            ].join('\n'))
          });

        }

        return completions;

      } else if (attr.endsWith('.')) {

        for (const [ component, record ] of this.model) {

          if (!attr.endsWith(`${component}.`)) continue;

          const completions: CompletionItem[] = [];

          for (const {
            name,
            sortOrder
          } of this.model.get(component).events.values()) {

            completions.push({
              label: name,
              detail: `spx${attr.slice(attr.lastIndexOf('@'), attr.lastIndexOf('='))}="${record.name}.${name}"`,
              sortText: `${sortOrder}`,
              kind: CompletionItemKind.Value,
              documentation: new MarkdownString([
                `**[${record.className} Component](${record.uri.fsPath})**\n`,
                `Callback will trigger \`${name}()\` method in ${record.className} component.`,
                '```\n\n'
              ].join('\n'))

            });

          }

          return completions;
        }

      }

    } else if (/spx-node=".*?$/.test(attr)) {

      if (attr.endsWith('="') || /[ |,]$/.test(attr)) {

        const completions: CompletionItem[] = [];

        for (const {
          className,
          uri,
          name,
          nodes
        } of this.model.values()) {

          if (nodes.size === 0) continue;

          completions.push({
            label: name,
            detail: `spx-node="${name}.<node>"`,
            kind: CompletionItemKind.Value,
            documentation: new MarkdownString([
              `**[${className} Component](${uri.fsPath})**\n`,
              `${nodes.size} available node${nodes.size > 1 ? 's' : ''}`
            ].join('\n'))
          });

        }

        return completions;

      } else if (attr.endsWith('.')) {

        for (const [ component, records ] of this.model) {

          if (!attr.endsWith(`${component}.`)) continue;

          const completions: CompletionItem[] = [];

          for (const {
            name,
            domName,
            elementName
          } of this.model.get(component).nodes.values()) {

            completions.push({
              label: name,
              detail: `spx-node="${component}.${name}`,
              kind: CompletionItemKind.Field,
              documentation: new MarkdownString([
              `[${records.className} Component](${records.uri.fsPath}) (DOM Node)\n`,
              `Available as \`${elementName ? `HTML${capitalize(elementName)}` : 'HTML'}Element\`\n`,
              '```js',
              `this.dom.${domName}`,
              `this.dom.${domName}s`,
              `this.dom.has${capitalize(domName)}`,
              '```\n\n'
              ].join('\n'))
            });

          }

          return completions;

        }
      }
    }

    return undefined;

  }

  resolveCompletionItem (item: CompletionItem, token: CancellationToken): ProviderResult<CompletionItem> {

    console.log(item);

    return item;

  }

}
