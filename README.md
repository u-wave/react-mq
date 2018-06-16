# @u-wave/react-mq

Barebones CSS media query component for React

[Install][] - [Usage][] - [Demo][] - [Props][]

## Install

```
npm install --save @u-wave/react-mq
```

## Usage

[Demo][] - [Demo source code][]

```js
import Media from '@u-wave/react-mq';

<Media query="(min-width: 768px)">
  <div>Rendered on desktop-size screens only</div>
</Media>

<Media
  query="(min-width: 768px)"
  render={matches => <div>Does it match? {matches ? 'yes' : 'no'}</div>}
/>
```

## Props

| Name | Type | Description |
|:-----|:-----|:-----|
| query | string | A [media query string][Media queries]. |
| children | node | React element(s) to render when `query` matches. |
| render | () => node | Render function; receives a single boolean parameter that equals `true` when `query` matches, `false` when it does not. |

Either one of the `children` or `render()` props must be provided.

## Related

* [react-responsive](https://github.com/contra/react-responsive) - The primary inspiration for this module. It also supports specifying media query properties like `min-width` as props. It has broader browser support than alternatives.
* [react-media](https://github.com/ReactTraining/react-media) - Supports specifying media query properties as an object. It doesn't support the simple boolean `<Media>Rendered if match</Media>` syntax.

## License

[MIT][]

[Install]: #install
[Usage]: #usage
[Props]: #props
[Demo]: https://u-wave.github.io/react-mq
[Demo source code]: ./example
[MIT]: ./LICENSE
[Media queries]: https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries
