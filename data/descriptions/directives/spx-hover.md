Instructs SPX to perform a prefetch of the provided `href` value on mouseover (or touchstart). The value accepts a `boolean` of `true` or `false` and will default to `true` if omitted. This directive is optional depending on options defined upon SPX Connection and in cases where SPX has been configured to perform hover prefetching as a default behavior it can be used as an exclusion marker.

**Example usage**

<!--prettier-ignore-->
```html
<!-- Prefetch Enabled -->
<a href="/foo" spx-hover>Foo</a>
<a href="/bar" spx-hover="true">Bar</a>

 <!-- Prefetch Disabled -->
<a href="/baz" spx-hover="false">Baz</a>
```

> **NOTE**
>
> This directive is optional. If SPX has been configured to perform hover prefetching by default, you can use this directive as an exclusion marker to disable prefetching for specific links.

#

[SPX Docs](https://spx.js.org/directives/spx-hover)
