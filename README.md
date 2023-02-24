<img src="https://github.com/iqbal-rashed/pdftoimg-js/raw/main/logo.png">

> IMPORTANT NOTE: `This library is still under testing`, so please test and report issue. your help is much appreciated. Contributors are also welcome!

# **PDF TO IMG - _A javascript library_**

[<img src="https://img.shields.io/badge/PDF TO IMG - JS-010101?&style=for-the-badge&logo=Npm"/>](https://www.npmjs.com/package/pdftoimg-js)

A javascript library that convert pdf to img. It's support both platform nodejs and frontend library/framework like React, Nextjs.

**This library is powered by Mozilla's [PDF.js](https://github.com/mozilla/pdf.js)**

## **Installation**

```bash
npm install pdftoimg-js
```

## **Getting Started**

By default returns an `Array` of `base64` objects, each of which represents an image encoded in png format.

### NodeJS

```javascript
// typescript
import PdfToImg from "pdftoimg-js";
// commonjs
const { PdfToImg } = require("pdftoimg-js");

(async () => {
    const img = await PdfToImg("example.pdf");

    console.log(img); // Array of base64
})();
```

### Browser - React / Nextjs

```javascript
import PdfToImg from "pdftoimg-js/browser";

(async () => {
    const img = await PdfToImg("example.pdf");

    console.log(img); // Array of base64
})();
```

With customize `size`, `img type`, `return type`

```javascript
// es6 or esm
import PdfToImg from "pdftoimg";
// commonjs
const { PdfToImg } = require("pdftoimg");

(async () => {
    const pdf = fs.readFileSync(path.join(__dirname, "example.pdf"));

    const allPages = await PdfToImg(pdf, {
        scale: 1.5, // accept only number
        returnType: "base64", // accept "base64" and "buffer"
        imgType: "jpg", // accept "png" and "jpg"
        pages: "all",
    });

    console.log(allPages); // Array of base64 string

    const singlePage = await PdfToImg(pdf, {
        scale: 1.5, // accept only number
        returnType: "buffer", // accept "base64" and "buffer"
        imgType: "jpg", // accept "png" and "jpg"
        pages: "firstPage",
    });

    console.log(singlePage); // Buffer
})();
```

<br/>

## **PdfToImg API**

### PdfToImg(filePath, options)

Initialize PDF to image conversion by supplying a filePath and options

#### filePath

Nodejs - `Buffer` | `URL` | `string` | `string[]` | `Buffer[]` | `URL[]`;

Browser - `ArrayBuffer` | `URL` | `string` | `File` | `File[]` | `FileList` `string[]` | `ArrayBuffer[]` | `URL[]`;

#### options

-   `scale` - increase and decrease image size e.g `1.5`
-   `imgType` - set img type, accept `"png"` or `"jpg"`
-   `returnType` - set return type only accept `"buffer"` or `"base64"` and for browser you'll get `"blob"` support
-   `flat` - support `boolean`, when you convert multiple pdf `flat:true` will return all image into single array
-   `pages` - page number/s to be converted to images
    -   `number` - page number eg `1`.
    -   `"firstPage"` - first page will be converted.
    -   `"lastPage"` last page will be converted.
    -   `"all"` all page will be converted to image.
    -   `number[]` - indicating the page number e.g. `[1,2,3]`
    -   `object` - converted image between two pages
        -   `startPage` - accepts number default `1`.
        -   `endPage` - accepts number default pdf pages length.

<br/>

## Contributing and Supporting

If you'd like to contribute, please do submit a pull request or atleast help me to fix docs grammatical issue

-   Fork it!
-   Create your feature branch: `git checkout -b my-new-feature`
-   Add your changes: `git add .`
-   Commit your changes: `git commit -am 'Add some feature'`
-   Push to the branch: `git push origin my-new-feature`
-   Submit a pull request :sunglasses:

In case you want support my work

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/rashed.iqbal)
