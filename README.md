<img src="https://github.com/iqbal-rashed/pdftoimg-js/raw/main/logo.png">

> Important Note: This is the first release of the library, so if you encounter any issues, please submit them. Your feedback is greatly appreciated. Contributors are also welcome!

# **PDF TO IMG - _A javascript library_**

[<img src="https://img.shields.io/badge/PDF TO IMG - JS-010101?&style=for-the-badge&logo=Npm"/>](https://www.npmjs.com/package/pdftoimg-js)

PDFtoIMG-JS is a powerful JavaScript library for converting PDF file/files to images. It supports both Node.js and browser environments, including popular frameworks such as React and Next.js.This library supports multiple PDF files and offers dynamic TypeScript types, making it ideal for a wide range of applications.

**This library is powered by Mozilla's [PDF.js](https://github.com/mozilla/pdf.js)**

## **Installation**

```bash
npm install pdftoimg-js
```

## **Getting Started**

The library returns an array of base64-encoded image objects by default, where each object represents an image in PNG format.

### Node.js

Here is an example of how to use pdftoimg-js in a Node.js application:

```javascript
// typescript
import PdfToImg from "pdftoimg-js";
// commonjs
const { PdfToImg } = require("pdftoimg-js");

(async () => {
    const img = await PdfToImg("example.pdf");

    console.log(img); // Array of base64 strings
})();
```

### Browser - React / Nextjs

Here is an example of how to use pdftoimg-js in a web browser:

```javascript
import PdfToImg from "pdftoimg-js/browser";

(async () => {
    const response = await fetch("example.pdf");
    const pdf = await response.arrayBuffer();
    const images = await PdfToImg(pdf);

    console.log(img); // Array of base64
})();
```

### Customization

You can customize the library to return images with specific size, image type, and return type using the following TypeScript or CommonJS code:

```javascript
// typescript
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

### PdfToImg(file, options)

Initialize PDF to image conversion by supplying a input file and options

#### file - accept the following input file types:

-   Node.js: `Buffer`, `URL`, `string`, `string[]`, `Buffer[]`, and `URL[]`
-   Browser: `ArrayBuffer`, `URL`, `File`, `File[]`, `FileList`, `string[]`, and ArrayBuffer[]

#### options - An object containing the following properties:

-   `scale` - A number representing the scale of the images to be generated. Default is `1`.
-   `imgType` - A string representing the type of the images to be generated. The accepted values are `"png"` and `"jpg"`. Default is `"png"`.
-   `returnType` - A string representing the type of the output to be generated. The accepted values are `"base64"`, `"buffer"` and (`"blob"` browser only). Default is `"base64"`.
-   `flat` - A boolean that can be used to flatten the array of image data returned (Multiple pdf only). Default is `false`.
-   `pages` - A string, number, number array, or object that specifies the page or pages to convert. The available options are:
    -   `A number`: Convert the specified page number to an image.
    -   `"firstPage"`: Convert the first page to an image.
    -   `"lastPage"`: Convert the last page to an image.
    -   `"all"`: Convert all pages to images.
    -   `An array of numbers`: Convert the specified page numbers to images.
    -   `{ startPage: number, endPage: number }`:Convert the pages between the specified start and end page numbers to images. Default is "all"

pdftoimg-js is a powerful and flexible library for converting PDF files to images in JavaScript. Whether you are working with Node.js or in the browser, pdftoimg-js can help you get the job done quickly and easily.

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
