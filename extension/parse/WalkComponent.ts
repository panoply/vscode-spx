/* eslint-disable no-unused-vars */

import { parse, AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { Uri } from 'vscode';
import { downcase, kebabCase } from '../utils';
import { ElementNames, SPXEventNames, SPXEventProperties } from './const';

export enum EventSortOrder {
  /**
   * Rank of `1` infers method is 100% an event method:
   *
   * 1. SPX Type inferred parameter
   *
   * ```ts
   * method(event: SPX.Event) {} // Uses an SPX.Event type
   * ```
   */
  DEFINITELY = 1,
  /**
   * Score of `2` infers method is likely an event, this is determined by:
   *
   * 1. Type inferred parameter
   *
   * ```ts
   * method(event: Event) {} // Likely because of the Event Type
   * ```
   */
  LIKELY = 2,
  /**
   * Score of `3` infers method is possibly an event, this is determined by:
   *
   * 1. A Single parameter
   * 2. Parameter is named `event`
   *
   * ```ts
   * method(event) {} // Possibly because of the `event` parameter
   * ```
   */
  POSSIBLE = 3,
  /**
   * Score of `4` infers method is maybe an event, this is determined by:
   *
   * 1. A Single parameter
   * 2. Parameter is named `e`
   * 3. A method prefixed by "on"
   *
   * ```ts
   * method(e) {}  // Maybe because of the `e`
   * onMethod() {} // Maybe because of the "on" prefix
   * ```
   */
  MAYBE = 4,
  /**
   * Score of `5` infers method is unlikely an event method, this is determined by:
   *
   * 1. More than 1 parameter
   * 2. No Event type inference
   *
   * ```ts
   * method(one, two) {} // method is probably not an event
   * ```
   */
  UNLIKELY = 5,
}

export interface Nodes {
  /**
   * The raw name as per the array list
   */
  name: string;
  /**
   * The dom name property
   *
   * ```js
   * 'foo' > this.dom.fooNode
   * ```
   */
  domName: string;
  /**
   * Element name reference which is determined when a node
   * is prefixed with an HTML element name, if no match is
   * determined this will be `null`
   *
   * ```js
   * 'inputFoo'  > 'input'
   * 'buttonBar' > 'button'
   * ```
   */
  elementName: string;
  /**
   * The location range of this state value
   */
  range: TSESTree.SourceLocation
}

export interface State {
  /**
   * The state (camelCase) markup name.
   *
   * ```js
   * 'someNameInComponent'
   * ```
   */
  name: string;
  /**
   * The state (kebab-case) markup name.
   *
   * ```js
   * 'someNameInComponent' > 'some-name-in-component'
   * ```
   */
  markupName: string;
  /**
   * The value type
   */
  valueType: 'string' | 'number' | 'boolean' | 'array' | 'object';
  /**
   * If a type with known values otherwise this is `null`
   * Currently, this will only work for string literals
   */
  valueLiteral: string[];
  /**
   * When a default value is provided, it will exist here,
   * otherwise this will be the spx default state type value.
   */
  valueDefault: string;
  /**
   * The location range of this state value
   */
  range: TSESTree.SourceLocation
}

export interface Event {
  /**
   * The method name of the event in the class
   */
  name: string;
  /**
   * If the method has a comment annotation this will hold the value.
   * The comments Asterisk `*` will be omitted. If no comment annotation
   * this will be `null`
   */
  // annotation: string;
  /**
   * The sort order ranking of the method. A value of `1`
   * infers we are positive of the method being an event. There
   * is a ranking of `5`
   *
   * - `1` - Definitely an Event
   * - `2` - Likely an Event
   * - `3` - Possibly an Event
   * - `4` - Maybe an Event
   * - `5` - Unlikely an Event
   *
   * The rank will determine the sorting order in completions, with
   * methods rendering first with a value `1`
   */
  sortOrder: EventSortOrder;
  /**
   * The location range of this event method
   */
  range: TSESTree.SourceLocation
}

export interface Model {
  /**
   * The component files URI
   */
  uri: Uri;
  /**
   * The component (downcase) markup name.
   */
  name: string;
  /**
   *  The component (PascalCase) name.
   */
  className: string;
  /**
   * Whether or not the component name is an identifier. When
   * this is `true` the `define` static expressed `id` value.
   */
  identifier: boolean;
  /**
   * SPX Component State
   */
  states: Map<string, State>
  /**
   * SPX DOM Nodes
   */
  nodes: Map<string, Nodes>;
  /**
   * SPX Events
   */
  events: Map<string, Event>;

}

function isNotHookMethod (name: string) {

  return (
    name !== 'connect' &&
    name !== 'onmount' &&
    name !== 'unmount' &&
    name !== 'onmedia'
  );

}

function isEventAnnotation (name: string) {

  return name === 'Event' || /^[A-Z][a-z][A-Za-z]+Event$/.test(name);

}

function setDefaultStates (name: string, state: State) {

  if (name === 'String') {

    if (state.valueDefault === null) state.valueDefault = "''";

    state.valueType = 'string';

  } else if (name === 'Boolean') {
    state.valueDefault = 'false';
    state.valueType = 'boolean';
  } else if (name === 'Number') {
    state.valueDefault = '0';
    state.valueType = 'number';
  } else if (name === 'Array') {
    state.valueDefault = '[]';
    state.valueType = 'array';
  } else if (name === 'Object') {
    state.valueDefault = '{}';
    state.valueType = 'object';
  }

}

function WalkNodes (name: string, nodesBody: TSESTree.StringLiteral, nodes: Map<string, Nodes>) {

  const prefix = name.match(/[a-z]+(?=[A-Z])/)?.input;

  nodes.set(name, {
    name,
    domName: `${name}Node`,
    elementName: ElementNames.has(name) ? name : ElementNames.has(prefix) ? prefix : null,
    range: nodesBody.loc
  });

}

function WalkState (name: string, stateBody: TSESTree.Property, record: Map<string, State>) {

  const state: State = {
    name,
    markupName: null,
    valueDefault: null,
    valueLiteral: null,
    valueType: null,
    range: null
  };

  if (stateBody.value.type === AST_NODE_TYPES.Identifier) {

    setDefaultStates(stateBody.value.name, state);

  } else if (
    stateBody.value.type === AST_NODE_TYPES.TSInstantiationExpression &&
    stateBody.value.expression.type === AST_NODE_TYPES.Identifier) {

    if (stateBody.value.expression.name === 'String') {
      if (
        stateBody.value.typeArguments.type === AST_NODE_TYPES.TSTypeParameterInstantiation &&
        stateBody.value.typeArguments.params.length === 1 &&
        stateBody.value.typeArguments.params[0].type === AST_NODE_TYPES.TSUnionType) {

        for (const typeUnion of stateBody.value.typeArguments.params[0].types) {
          if (
            typeUnion.type === AST_NODE_TYPES.TSLiteralType &&
            typeUnion.literal.type === AST_NODE_TYPES.Literal &&
            typeof typeUnion.literal.value === 'string') {

            // We have literal types
            if (state.valueLiteral === null) state.valueLiteral = [];

            state.valueLiteral.push(typeUnion.literal.value);

          }
        }
      }

      if (state.valueLiteral === null) {
        setDefaultStates(stateBody.value.expression.name, state);
      }

    } else {

      setDefaultStates(stateBody.value.expression.name, state);

    }

  } else if (stateBody.value.type === AST_NODE_TYPES.ObjectExpression) {

    for (const stateProperty of stateBody.value.properties) {
      if (
        stateProperty.type === AST_NODE_TYPES.Property &&
        stateProperty.key.type === AST_NODE_TYPES.Identifier) {

        if (
          stateProperty.key.name === 'typeof' &&
          stateProperty.value.type === AST_NODE_TYPES.Identifier) {
          setDefaultStates(stateProperty.value.name, state);
        } else if (
          stateProperty.key.name === 'default' &&
          stateProperty.value.type === AST_NODE_TYPES.Literal &&
          typeof stateProperty.value.value === 'string') {

          state.valueDefault = stateProperty.value.value;

        }

      }
    }

  }

  if (state.valueType !== null) {

    state.markupName = kebabCase(name);
    state.range = stateBody.loc;

    record.set(state.markupName, state);

  }

}

function WalkDefine (defineBody: TSESTree.ObjectLiteralElement, record: Model) {

  if (defineBody.type === AST_NODE_TYPES.Property && defineBody.key.type === AST_NODE_TYPES.Identifier) {

    if (
      defineBody.value.type === AST_NODE_TYPES.ObjectExpression &&
      defineBody.key.name === 'state') {

      for (const stateBody of defineBody.value.properties) {
        if (
          stateBody.type === AST_NODE_TYPES.Property &&
          stateBody.key.type === AST_NODE_TYPES.Identifier) {

          // Populate State
          WalkState(stateBody.key.name, stateBody, record.states);

        }
      }

    } else if (defineBody.key.name === 'nodes') {

      const nodeType = defineBody.value.type === AST_NODE_TYPES.TSTypeAssertion
        ? defineBody.value.expression
        : defineBody.value;

      if (nodeType.type === AST_NODE_TYPES.ArrayExpression) {
        for (const nodesBody of nodeType.elements) {
          if (
            nodesBody.type === AST_NODE_TYPES.Literal &&
            typeof nodesBody.value === 'string') {
            // Populate Nodes
            WalkNodes(nodesBody.value, nodesBody, record.nodes);
          }
        }
      }
    }
  }

}

function TypeAnnotation (typeBody: TSESTree.TSTypeAnnotation, rank: EventSortOrder): EventSortOrder {

  if (typeBody.typeAnnotation.type === AST_NODE_TYPES.TSTypeReference) {

    if (
      typeBody.typeAnnotation.typeName.type === AST_NODE_TYPES.TSQualifiedName &&
      typeBody.typeAnnotation.typeName.left.type === AST_NODE_TYPES.Identifier &&
      typeBody.typeAnnotation.typeName.left.name === 'SPX' &&
      typeBody.typeAnnotation.typeName.right.type === AST_NODE_TYPES.Identifier &&
      SPXEventNames.has(typeBody.typeAnnotation.typeName.right.name)) {

      return EventSortOrder.DEFINITELY;

    } else if (
      typeBody.typeAnnotation.typeName.type === AST_NODE_TYPES.Identifier &&
      isEventAnnotation(typeBody.typeAnnotation.typeName.name)) {

      return EventSortOrder.LIKELY;

    }

  }

  return rank === EventSortOrder.MAYBE
    ? EventSortOrder.UNLIKELY
    : rank === EventSortOrder.POSSIBLE
      ? EventSortOrder.MAYBE
      : rank;
}

function WalkEvents (name: string, methodBody: TSESTree.FunctionLike, record: Map<string, Event>) {

  const event: Event = {
    name,
    sortOrder: /^on[A-Z]/.test(name) ? EventSortOrder.MAYBE : EventSortOrder.UNLIKELY,
    range: methodBody.loc
  };

  if (methodBody.params.length > 0) {

    const methodParam = methodBody.params[0];

    if (methodParam.type === AST_NODE_TYPES.Identifier) {

      if (methodParam.name === 'e') {

        event.sortOrder = event.sortOrder === EventSortOrder.MAYBE
          ? EventSortOrder.POSSIBLE
          : EventSortOrder.MAYBE;

      } else if (methodParam.name === 'event') {

        event.sortOrder = event.sortOrder === EventSortOrder.MAYBE
          ? EventSortOrder.LIKELY
          : EventSortOrder.POSSIBLE;

      }

      // Lets see if we have type annotation
      if (methodParam?.typeAnnotation?.type === AST_NODE_TYPES.TSTypeAnnotation) {
        event.sortOrder = TypeAnnotation(methodParam.typeAnnotation, event.sortOrder);
      }

    } else if (methodParam?.type === AST_NODE_TYPES.ObjectPattern) {

      for (const propertyBody of methodParam.properties) {
        if (
          propertyBody.type === AST_NODE_TYPES.Property &&
          propertyBody.key.type === AST_NODE_TYPES.Identifier) {

          if (propertyBody.key.name === 'attrs') {
            event.sortOrder = EventSortOrder.DEFINITELY;
            break;
          } else if (SPXEventProperties.has(propertyBody.key.name)) {
            event.sortOrder = EventSortOrder.DEFINITELY;
            break;
          }

        }
      }
    }
  }

  record.set(name, event);

}

export function WalkComponent (uri: Uri, code: string, model: Map<string, Model>) {

  const ast = parse(code, { loc: true, range: true, allowInvalidAST: true });
  const keys: Set<string> = new Set();

  for (const body of ast.body) {

    const declaration = body?.type === AST_NODE_TYPES.ExportNamedDeclaration
      ? body?.declaration
      : body;

    if (
      declaration !== null &&
      declaration.type === AST_NODE_TYPES.ClassDeclaration &&
      declaration.superClass?.type === AST_NODE_TYPES.MemberExpression &&
      declaration.superClass.object.type === AST_NODE_TYPES.Identifier &&
      declaration.superClass.object.name === 'spx' &&
      declaration.superClass.property.type === AST_NODE_TYPES.Identifier &&
      declaration.superClass.property.name === 'Component' &&
      declaration.body.type === AST_NODE_TYPES.ClassBody &&
      declaration.id !== null) {

      const name = downcase(declaration.id.name);

      keys.add(name);

      let record: Model;
      let known: boolean;

      if (model.has(name)) {

        record = model.get(name);
        known = true;

        record.identifier = false;
        record.states.clear();
        record.nodes.clear();
        record.events.clear();

      } else {

        model.set(name, {
          uri,
          name,
          className: declaration.id.name,
          identifier: false,
          events: new Map(),
          nodes: new Map(),
          states: new Map()
        });

        record = model.get(name);
        known = false;

      }

      for (const classBody of declaration.body.body) {

        if (
          classBody.type === AST_NODE_TYPES.PropertyDefinition &&
          classBody.key.type === AST_NODE_TYPES.Identifier) {

          if (
            classBody.static === true &&
            classBody.value !== null &&
            classBody.value.type === AST_NODE_TYPES.ObjectExpression &&
            classBody.key.name === 'define') {

            if (classBody.value.properties.length > 0) {
              // Parse Define
              for (const defineBody of classBody.value.properties) {
                WalkDefine(defineBody, record);
              }

            } else if (known) {
              record.states.clear();
              record.nodes.clear();
              record.identifier = false;
            }

          } else if (
            classBody.value !== null &&
            classBody.value.type === AST_NODE_TYPES.ArrowFunctionExpression &&
            isNotHookMethod(classBody.key.name)) {

            WalkEvents(classBody.key.name, classBody.value, record.events);

          }

        } else if (
          classBody?.type === AST_NODE_TYPES.MethodDefinition &&
          classBody.key?.type === AST_NODE_TYPES.Identifier &&
          classBody.value?.type === AST_NODE_TYPES.FunctionExpression &&
          isNotHookMethod(classBody.key.name)) {

          WalkEvents(classBody.key.name, classBody.value, record.events);

        }
      }
    }
  }

  return keys;

}
