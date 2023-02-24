import { OptionsType as OpType, ReturnType } from "./types";
import * as pdfjsLib from "pdfjs-dist";
import { PageToImgType } from "./types";
import { GetSrcOptions, base64ToBuffer, isBrowser, rangeToArr } from "./utils";
import { DocumentInitParameters } from "pdfjs-dist/types/src/display/api";

pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.1.81/pdf.worker.min.js";

type SrcType =
    | string
    | URL
    | ArrayBuffer
    | File
    | FileList
    | File[]
    | ArrayBuffer[]
    | string[]
    | URL[];

/**
 *
 * @param src This are src type
 * @param options this is options object
 * @returns Return type
 */
export async function PdfToImgBrowser<
    T extends OpType,
    K extends
        | string
        | URL
        | ArrayBuffer
        | File
        | FileList
        | File[]
        | ArrayBuffer[]
        | string[]
        | URL[]
>(src: K, options?: T): Promise<ReturnType<T, K>> {
    if (!isBrowser) {
        throw new Error("You've called wrong function in browser");
    }
    if (src instanceof FileList || Array.isArray(src)) {
        const resultArr = await Promise.all(
            Array.from(src as any[]).map(async (v) => {
                const { documentParams, opt } = GetSrcOptions(v, options);
                return await SinglePdfToImg(documentParams, opt);
            })
        );
        return (options?.flat ? resultArr.flat() : resultArr) as ReturnType<
            T,
            K
        >;
    } else {
        const { documentParams, opt } = GetSrcOptions(src, options);
        return (await SinglePdfToImg(documentParams, opt)) as ReturnType<T, K>;
    }
}

async function SinglePdfToImg(
    documentParams: DocumentInitParameters,
    opt: OpType
) {
    const pdfDoc = await pdfjsLib.getDocument({ ...documentParams }).promise;

    const numPages = pdfDoc.numPages;

    const pages = opt.pages;

    if (pages === "firstPage") {
        return await PageToImg(pdfDoc, 1, opt as any);
    }

    if (pages === "lastPage") {
        return await PageToImg(pdfDoc, numPages, opt as any);
    }

    if (typeof pages === "number") {
        return await PageToImg(pdfDoc, 1 < pages ? pages : 1, opt as any);
    }

    if (typeof pages === "object") {
        if (Array.isArray(pages)) {
            return Promise.all(
                (pages.length ? pages : [1]).map(async (i) => {
                    return await PageToImg(pdfDoc, i, opt as any);
                })
            );
        } else {
            return Promise.all(
                rangeToArr(pages.startPage || 1, pages.endPage || numPages).map(
                    async (i) => {
                        return await PageToImg(pdfDoc, i, opt as any);
                    }
                )
            );
        }
    }

    const numArr = Array.from({ length: numPages }, (_, i) => i + 1);

    return Promise.all(
        numArr.map(async (i) => {
            return await PageToImg(pdfDoc, i, opt as any);
        })
    );
}

const PageToImg: PageToImgType = async (pdfDoc, pageNumber, options) => {
    const { scale, imgType, returnType } = options;
    const page = await pdfDoc.getPage(pageNumber);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");

    const canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderTask = page.render({ canvasContext, viewport });

    await renderTask.promise;

    if (returnType === "blob") {
        const result = await new Promise((res, rej) => {
            canvas.toBlob(
                (blob) => {
                    res(blob);
                },
                imgType === "jpg" ? "image/jpeg" : "image/png"
            );
        });
        return result;
    }

    let image =
        imgType === "jpg"
            ? canvas.toDataURL("image/jpeg")
            : canvas.toDataURL("image/png");

    return returnType === "base64" ? image : base64ToBuffer(image);
};

export const PdfToImg: <
    T extends OpType,
    K extends
        | string
        | URL
        | ArrayBuffer
        | File
        | FileList
        | File[]
        | ArrayBuffer[]
        | string[]
        | URL[]
>(
    src: K,
    options?: T
) => Promise<ReturnType<T, K>> = PdfToImgBrowser;

export default PdfToImg;
