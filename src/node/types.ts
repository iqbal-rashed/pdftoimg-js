import {
    DocumentInitParameters,
    PDFDocumentProxy,
} from "pdfjs-dist/types/src/display/api";

export type DocumentParams = Omit<DocumentInitParameters, "data" | "url">;

export type PagesType =
    | {
          startPage?: number;
          endPage?: number;
      }
    | "firstPage"
    | "lastPage"
    | "all"
    | number
    | number[];

export type OptionsType = {
    imgType?: "png" | "jpg";
    scale?: number;
    pages?: PagesType;
    returnType?: "buffer" | "base64";
    documentOptions?: DocumentParams;
    flat?: boolean;
};

type FlatReturn<T, K> = T extends { flat: true } ? K : K[];

type PageReturn<T, K> = T extends { pages: number | "firstPage" | "lastPage" }
    ? K
    : K[];

type ArrayReturn<T> = T extends { returnType: "buffer" }
    ? PageReturn<T, FlatReturn<T, Buffer>>
    : T extends { returnType: "base64" }
    ? PageReturn<T, FlatReturn<T, string>>
    : PageReturn<T, FlatReturn<T, string>>;

type SrcArray = string[] | Buffer[] | URL[];

export type ReturnType<T, K> = K extends SrcArray
    ? ArrayReturn<T>
    : T extends { returnType: "buffer" }
    ? PageReturn<T, ArrayBuffer>
    : T extends { returnType: "base64" }
    ? PageReturn<T, string>
    : PageReturn<T, string>;

export type PageToImgType = (
    pdfDocument: PDFDocumentProxy,
    pageNumber: number,
    options: {
        imgType: "png" | "jpg";
        scale: number;
        returnType: "buffer" | "base64";
    }
) => any;
