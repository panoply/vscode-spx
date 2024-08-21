import { parse, AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';

export interface Model {
  stateKeys: string[];
  nodeNames: string[];
  eventRefs: string[];
}

export function parseComponent (code: string, model: Map<string, Model>) {

  const ast = parse(code, { loc: false, range: false });
  const ids: Set<string> = new Set();

  for (const body of ast.body) {

    const declaration = body.type === AST_NODE_TYPES.ExportNamedDeclaration
      ? body.declaration
      : body;

    if (
      declaration?.type === AST_NODE_TYPES.ClassDeclaration &&
      declaration.superClass?.type === AST_NODE_TYPES.MemberExpression &&
      declaration.superClass.object.type === AST_NODE_TYPES.Identifier &&
      declaration.superClass.object.name === 'spx' &&
      declaration.superClass.property.type === AST_NODE_TYPES.Identifier &&
      declaration.superClass.property.name === 'Component' &&
      declaration.body.type === AST_NODE_TYPES.ClassBody &&
      declaration.id !== null) {

      const component = declaration.id.name[0].toLowerCase() + declaration.id.name.slice(1);
      const record: Model = model.set(component, {
        stateKeys: [],
        nodeNames: [],
        eventRefs: []
      }).get(component) as Model;

      ids.add(component);

      for (const classBody of declaration.body.body) {

        if (
          classBody.type === AST_NODE_TYPES.PropertyDefinition &&
          classBody.static === true &&
          classBody.key.type === AST_NODE_TYPES.Identifier &&
          classBody.key.name === 'define' &&
          classBody.value?.type === AST_NODE_TYPES.ObjectExpression) {

          for (const defineBody of classBody.value.properties) {
            if (
              defineBody.type === AST_NODE_TYPES.Property &&
              defineBody.key.type === AST_NODE_TYPES.Identifier) {

              if (
                defineBody.value.type === AST_NODE_TYPES.ObjectExpression &&
                defineBody.key.name === 'state') {

                for (const stateKeys of defineBody.value.properties) {
                  if (
                    stateKeys.type === AST_NODE_TYPES.Property &&
                    stateKeys.key.type === AST_NODE_TYPES.Identifier) {

                    // Add state keys
                    record.stateKeys.push(stateKeys.key.name);

                  }
                }
              } else if (defineBody.key.name === 'nodes') {

                const nodeType = defineBody.value.type === AST_NODE_TYPES.TSTypeAssertion
                  ? defineBody.value.expression
                  : defineBody.value;

                if (nodeType.type === AST_NODE_TYPES.ArrayExpression) {

                  for (const nodeNames of nodeType.elements) {
                    if (
                      nodeNames !== null &&
                      nodeNames.type === AST_NODE_TYPES.Literal &&
                      typeof nodeNames.value === 'string') {

                      // Add node name keys
                      record.nodeNames.push(nodeNames.value);

                    }
                  }
                }
              }
            }
          }
        } else if (
          classBody.type === AST_NODE_TYPES.MethodDefinition &&
          classBody.key.type === AST_NODE_TYPES.Identifier &&
          classBody.value.type === AST_NODE_TYPES.FunctionExpression) {

          if (
            classBody.key.name !== 'connect' &&
            classBody.key.name !== 'onmount' &&
            classBody.key.name !== 'unmount' &&
            classBody.key.name !== 'onmedia') {

            // Add event names
            record.eventRefs.push(classBody.key.name);
          }
        }
      }
    }
  }

  return ids;

}
