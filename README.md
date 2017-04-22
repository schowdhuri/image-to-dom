# Image to DOM

Convert an image to a matrix of DOM elements. This was primarily built to circumvent image blocking in email clients. Hence, the use of `<table>` elements.

## Installation

Using npm:

```
npm install --save image-to-dom
```

Within the browser:

```html
<script src="https://unpkg.com/image-to-dom"></script>
```

## Usage

```html
<div class="image-to-dom" data-src="media/01.jpg"></div>
```
```js
const i2d = new ImageToDOM(document.querySelector(".image-to-dom", {
  xres: 2,
  yres: 2
});
i2d.render();
```

### Options
- `xres` cell width (in `px`; defaults to `10`)
- `yres` cell height (in `px`; defaults to `10`)


__Note:__ When accessing straight off the filesystem, Chrome errors out with:
```
DOMException: Failed to execute 'getImageData' on 'CanvasRenderingContext2D': The canvas has been tainted by cross-origin data.
```

Use an HTTP server instead. My favorite is `python -m SimpleHTTPServer 8000`

## License

The MIT License (MIT)

Copyright (c) 2017 Subir Chowdhuri.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
