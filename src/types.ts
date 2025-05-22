import {
  DocumentInitParameters,
  TypedArray,
} from "pdfjs-dist/types/src/display/api";

export type DocumentParams = Omit<DocumentInitParameters, "data" | "url">;

export type PagesType =
  | { startPage?: number; endPage?: number }
  | "firstPage"
  | "lastPage"
  | "all"
  | number
  | number[];

export interface Options {
  /**
   * The type of image to output. Can be 'png' or 'jpg'. The default value is 'png'.
   */
  imgType?: "png" | "jpg";
  /**
   * The scale of the rendered image. The default value is 1.
   */
  scale?: number;
  /**
   * Background to use for the canvas. Any valid canvas.fillStyle can be used:
   * a DOMString parsed as CSS value, a CanvasGradient object (a linear or radial gradient)
   * or a CanvasPattern object (a repetitive image).
   * The default value is 'rgb(255,255,255)'.
   */
  background?: string | CanvasGradient | CanvasPattern | undefined;
  /**
   * Rendering intent, can be 'display', 'print', or 'any'. The default value is 'display'.
   */
  intent?: "display" | "print" | "any";
  /**
   * Specifies which pages to render from the PDF document. Can be:
   * - A single page number (e.g. 1)
   * - A page range object with optional startPage and endPage (e.g. {startPage: 1, endPage: 3})
   * - "firstPage" to render only the first page
   * - "lastPage" to render only the last page
   * - "all" to render all pages
   * - An array of specific page numbers (e.g. [1, 3, 5])
   * @default "all"
   */
  pages?: PagesType;
  /**
   * Additional document options.
   */
  documentOptions?: DocumentParams;
}

type PerSrcReturn<O extends Options> = O["pages"] extends
  | number
  | "firstPage"
  | "lastPage"
  ? string
  : string[];

export type PdfSrc = string | URL | TypedArray;

export type ReturnType<
  O extends Options,
  S extends PdfSrc | PdfSrc[],
> = S extends PdfSrc[] ? PerSrcReturn<O>[] : PerSrcReturn<O>;
