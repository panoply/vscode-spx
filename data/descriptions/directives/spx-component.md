Connects this element to an SPX Component. The expected value will default to using the class name but in `kebab-case` format - this is considered the **identifier** of a component. Developers may instead prefer to use a separate identifier which is made possible upon component registration (see [register](https://spx.js.org/components/register)).

**Example Usage**

Below the component `DemoExample` name is the identifier:

```ts
class DemoExample extends spx.Component {}
```

The DOM association will use a `kebab-case` format:

<!-- prettier-ignore -->
```html
<section spx-component="demo-example"></section>
```

[SPX Docs](https://spx.js.org/directives/spx-component)
