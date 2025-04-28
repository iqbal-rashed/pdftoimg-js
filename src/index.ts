import { CMAP_URL, STANDARD_FONT_DATA_URL } from "./constant";
import { Options, PdfSrc, ReturnType } from "./types";
import { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";
import { defaultOptions, getPagesArray, isTypedArrayStrict } from "./utils";

export function pdfToImg<O extends Options, S extends PdfSrc | PdfSrc[]>(
  src: S,
  options?: O,
): Promise<ReturnType<O, S>> {
  const convert = async (file: PdfSrc) => await singlePdfToImg(file, options);

  if (Array.isArray(src)) {
    return Promise.all(src.map(convert)) as Promise<ReturnType<O, S>>;
  }
  return convert(src) as Promise<ReturnType<O, S>>;
}

export async function singlePdfToImg(src: PdfSrc, opt: Partial<Options> = {}) {
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

  const requiredOpt: Required<Options> = { ...defaultOptions, ...opt };

  const pdfDocLoading = pdfjsLib.getDocument({
    standardFontDataUrl: STANDARD_FONT_DATA_URL,
    cMapUrl: CMAP_URL,
    cMapPacked: true,
    ...(isTypedArrayStrict(src)
      ? { data: Buffer.isBuffer(src) ? new Uint8Array(src) : src }
      : { url: src }),
    ...requiredOpt.documentOptions,
  });

  const pdfDoc = await pdfDocLoading.promise;

  const numPages = pdfDoc.numPages;

  const pageNums: number[] = getPagesArray(requiredOpt.pages, numPages);

  const images = await Promise.all(
    pageNums.map((n) => pageToImg(pdfDoc, n, requiredOpt)),
  );

  return requiredOpt.pages === "firstPage" ||
    requiredOpt.pages === "lastPage" ||
    typeof requiredOpt.pages === "number"
    ? images[0]
    : images;
}

async function pageToImg(
  pdfDoc: PDFDocumentProxy,
  pageNum: number,
  opt: Required<Options>,
): Promise<string | Buffer> {
  const page = await pdfDoc.getPage(pageNum);
  const viewport = page.getViewport({ scale: opt.scale });

  const canvasFactory: any = pdfDoc.canvasFactory;
  const { canvas, context } = canvasFactory.create(
    viewport.width,
    viewport.height,
  );

  const renderTask = page.render({ canvasContext: context, viewport });

  await renderTask.promise;

  const mime = opt.imgType === "jpg" ? "image/jpeg" : "image/png";
  const dataUrl = canvas.toDataURL(mime);

  return dataUrl;
}
