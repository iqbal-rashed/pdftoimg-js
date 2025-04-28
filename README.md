> **Version 2 Has Arrived! 🎉**  
> This release is still in beta, so we welcome your feedback and feature requests.  
> If you encounter any bugs, please report them by opening an issue on our [GitHub repository](https://github.com/iqbal-rashed/pdftoimg-js/issues).

# PDFtoIMG-JS

**PDFtoIMG-JS** is a powerful JavaScript library for converting **PDF file/files into images** (PNG or JPG).
It supports both **Node.js** and **browser environments**, making it ideal for a wide range of use cases — including integration with popular frameworks such as **React**, **Next.js**, **Vue**, and more.

## ✨ Features

- 📚 Supports **single** and **multiple** PDFs.
- 🎯 Choose specific **pages** (`all`, `firstPage`, `lastPage`, page numbers, or ranges like `1..3`).
- 🎨 Output images as **PNG** or **JPG** formats.
- 🔥 Compatible with **React**, **Next.js**, **Vue**, etc.
- 🛠 Fine control over **scale** and **output options**.
- 💻 Browser runtime automatically uses **HTML5 Canvas** rendering.
- 🧹 CLI ready for quick batch processing in **Node.js**.

## 📦 Installation

```bash
npm install pdftoimg-js
```

## 🛠 Basic Usage

#### 🚀 Example (Node.js Script)

```ts
import { pdfToImg } from "pdftoimg-js";

const images = await pdfToImg("example.pdf", {
  pages: "firstPage",
  imgType: "jpg",
  scale: 2,
});

console.log(images); // => Base64 encoded JPG image
```

#### 📝 Example (Browser)

```ts
import { pdfToImg } from "pdftoimg-js/browser";

const fileInput = document.getElementById("pdfInput");

fileInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  const images = await pdfToImg(URL.createObjectURL(file));

  images.forEach((imgSrc) => {
    const img = document.createElement("img");
    img.src = imgSrc;
    document.body.appendChild(img);
  });
});
```

## 📖 API Reference

### `pdfToImg(src, options?)`

Convert PDF(s) to images.

| Parameter | Type                                        | Description                     |
| :-------- | :------------------------------------------ | :------------------------------ |
| `src`     | `string, URL, Uint8Array, or Array of Each` | PDF file(s) input source.       |
| `options` | `Partial<Options>`                          | (Optional) Conversion settings. |

✅ **Returns**:

- If `pages` is a single page (`firstPage`, `lastPage`, or a number) ➔ Single image.
- Otherwise ➔ Array of images.

### Options (`Options` Interface)

```ts
interface Options {
  imgType?: "png" | "jpg"; // Default: "png"
  scale?: number; // Default: 1.5
  pages?: PagesType; // "all" | "firstPage" | "lastPage" | number | number[] | { startPage, endPage }
  documentOptions?: DocumentInitParameters; // (Optional) More PDF.js config.
}
```

### 🖽 Browser Support

- Auto-detects browser environment.
- Uses **Canvas API** for rendering pages.
- Sets **worker** dynamically from CDN:
  ```ts
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.mjs";
  ```
- Returns **base64 DataURL** for each page.

## 👡 CLI Usage (Node.js Only)

Command-line support to batch convert PDFs easily!

```bash
pdftoimg -i <input> [-o <output>] [-t <imgType>] [-s <scale>] [-p <pages>] [-n <template>] [-ps <password>]
```

### CLI Options

| Option            | Type     | Description                                                                |
| :---------------- | :------- | :------------------------------------------------------------------------- |
| `-i, --input`     | `string` | (Required) Input PDF path.                                                 |
| `-o, --out`       | `string` | Output directory (default: current directory).                             |
| `-t, --imgType`   | `string` | `png` or `jpg` (default: png).                                             |
| `-s, --scale`     | `number` | Scale factor (default: 1.5).                                               |
| `-p, --pages`     | `string` | `"all"`, `"firstPage"`, `"lastPage"`, page numbers, or ranges like `1..3`. |
| `-n, --name`      | `string` | Filename template `{i}`, `{p}`, `{ext}`, `{f}` available.                  |
| `-ps, --password` | `string` | Password for the PDF file if encrypted.                                    |

### ⚡ Example CLI Commands

Convert **first page** to PNG:

```bash
pdftoimg -i ./example.pdf -p firstPage
```

Convert **pages 1 to 3** to JPG:

```bash
pdftoimg -i ./example.pdf -t jpg -p 1..3
```

Save in a custom folder:

```bash
pdftoimg -i ./example.pdf -o ./output
```

## Contribution

Contributions are welcome! Feel free to check out the [Contributing Guide](https://github.com/iqbal-rashed/pdftoimg-js/blob/main/.github/contributing.md) before making a pull request.
