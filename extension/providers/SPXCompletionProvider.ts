import {
  CompletionItemProvider,
  TextDocument,
  Position,
  CompletionItem,
  CompletionItemKind,
  MarkdownString

} from 'vscode';
import { capitalize } from '../utils';
import { service } from '../service';

/**
 * `spx@<event>="`
 */
function isEventAttribute (attr: string) {
  return /spx@.*?=".*?$/.test(attr);
}

/**
 * `spx-node="`
 */
function isNodeAttribute (attr: string) {
  return /spx-node=".*?$/.test(attr);
}

/**
 * TODO
 *
 * `spx-bind="`
 */
// function isBindAttribute (attr: string) {
//   return /spx-node=".*?$/.test(attr);
// }

/**
 * `="`
 */
function isWithinAttributeValue (attr: string) {
  return attr.endsWith('="') || /[ |,]$/.test(attr);
}

/**
 * `<component>.`
 */
function isComponentPrefix (attr: string, component: string) {
  return attr.endsWith(`${component}.`);
}

/**
 * `.`
 */
function isMethodOrProperty (attr: string) {
  return attr.endsWith('.');
}

function getEventCompletionItem (attr: string) {

  const completions: CompletionItem[] = [];
  const eventName = attr.slice(attr.lastIndexOf('@'), attr.lastIndexOf('='));

  for (const { className, events, label, uri } of service.model.values()) {
    if (events.size > 0) {

      const detail = `spx${eventName}="${label}.<method>"`;
      const documentation = new MarkdownString()
        .appendMarkdown(`**[${className} Component](${uri.fsPath})**\n`)
        .appendMarkdown(`${events.size} available method${events.size > 1 ? 's' : ''}`);

      completions.push({
        label,
        detail,
        documentation,
        kind: CompletionItemKind.Value
      });

    }
  }

  return completions;

}

function getEventMethodCompletionItem (attr: string) {

  const completions: CompletionItem[] = [];
  const eventName = attr.slice(attr.lastIndexOf('@'), attr.lastIndexOf('='));

  for (const component of service.model.values()) {

    if (!isComponentPrefix(attr, component.label)) continue;

    for (const { name, sortOrder } of service.model.get(component.label).events.values()) {

      const detail = `spx${eventName}="${component.label}.${name}"`;
      const documentation = new MarkdownString()
        .appendMarkdown(`**[${component.className} Component](${component.uri.fsPath})**\n`)
        .appendMarkdown(`Callback will trigger \`${name}()\` method in ${component.className} component.`);

      completions.push({
        label: name,
        sortText: `${sortOrder}`,
        kind: CompletionItemKind.Value,
        detail,
        documentation
      });
    }
  }

  return completions;

}

function getNodeCompletionItem () {

  const completions: CompletionItem[] = [];

  for (const { className, nodes, label, uri } of service.model.values()) {
    if (nodes.size > 0) {

      const detail = `spx-node="${label}.<node>"`;
      const documentation = new MarkdownString()
        .appendMarkdown(`**[${className} Component](${uri.fsPath})**\n`)
        .appendMarkdown(`${nodes.size} available node${nodes.size > 1 ? 's' : ''}`);

      completions.push({
        label,
        detail,
        documentation,
        kind: CompletionItemKind.Value
      });

    }
  }

  return completions;

}

function getNodePropertyCompletionItem (attr: string) {

  const completions: CompletionItem[] = [];

  for (const component of service.model.values()) {

    if (!isComponentPrefix(attr, component.label)) continue;

    for (const { name, domName, elementType } of service.model.get(component.label).nodes.values()) {

      const detail = `spx-node="${component.label}.${name}`;
      const documentation = new MarkdownString()
        .appendMarkdown(`**[${component.className} Component](${component.uri.fsPath})**\n`)
        .appendMarkdown(`Available as an \`${elementType}\` type of DOM Node.\n`)
        .appendCodeblock(`this.dom.${domName}\nthis.dom.${domName}s\nthis.dom.has${capitalize(domName)}`, 'js');

      completions.push({
        label: name,
        kind: CompletionItemKind.Field,
        detail,
        documentation
      });
    }
  }

  return completions;

}

export class SPXCompletionProvider implements CompletionItemProvider {

  async provideCompletionItems (textDocument: TextDocument, position: Position): Promise<undefined|CompletionItem[]> {

    const value = textDocument.lineAt(position).text.slice(0, position.character);
    const index = value.lastIndexOf('spx');

    if (index === -1) return [];

    const attr = value.slice(index);

    /* -------------------------------------------- */
    /* EVENT DIRECTIVE                              */
    /* -------------------------------------------- */

    if (isEventAttribute(attr)) {

      // spx@event="<here>" OR spx@event="xxx <here>"
      if (isWithinAttributeValue(attr)) return getEventCompletionItem(attr);

      // spx@event="<component>.<here>" OR spx@event="xxx <component>.<here>"
      if (isMethodOrProperty(attr)) return getEventMethodCompletionItem(attr);

    }

    /* -------------------------------------------- */
    /* NODE DIRECTIVE                               */
    /* -------------------------------------------- */

    if (isNodeAttribute(attr)) {

      // spx-node="<here>" OR spx-node="xxx <here>"
      if (isWithinAttributeValue(attr)) return getNodeCompletionItem();

      // spx-node="<component>.<here>" OR  spx-node="xxx <component>.<here>"
      if (isMethodOrProperty(attr)) return getNodePropertyCompletionItem(attr);

    }

    /* -------------------------------------------- */
    /* BIND DIRECTIVE                               */
    /* -------------------------------------------- */

    // TODO

    return undefined;

  }

}
