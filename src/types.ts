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
  imgType?: "png" | "jpg";
  scale?: number;
  pages?: PagesType;
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
  S extends PdfSrc | PdfSrc[]
> = S extends PdfSrc[] ? PerSrcReturn<O>[] : PerSrcReturn<O>;
