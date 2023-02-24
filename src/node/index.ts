import { DocumentInitParameters } from "pdfjs-dist/types/src/display/api";
import * as _pdfjs from "pdfjs-dist/legacy/build/pdf";
import {
    GetSrcOptions,
    NodeCanvasFactory,
    base64ToBuffer,
    rangeToArr,
} from "./utils";
import path from "path";
import { OptionsType as OpType, PageToImgType, ReturnType } from "./types";

const pdfjsLib: typeof import("pdfjs-dist") = _pdfjs;

const pdfjsPath = path.dirname(require.resolve("pdfjs-dist/package.json"));

type SrcType = string | URL | Buffer | Buffer[] | string[] | URL[];

/**
 *
 * @param src This are src type
 * @param options this is options object
 * @returns Return type
 */
export async function PdfToImgNode<T extends OpType, K extends SrcType>(
    src: K,
    options?: T
): Promise<ReturnType<T, K>> {
    if (Array.isArray(src)) {
        const resultArr = await Promise.all(
            Array.from(src).map(async (v) => {
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
    const pdfDoc = await pdfjsLib.getDocument({
        standardFontDataUrl: path.join(pdfjsPath, `standard_fonts${path.sep}`),
        cMapUrl: path.join(pdfjsPath, `cmaps${path.sep}`),
        cMapPacked: true,
        ...documentParams,
    }).promise;

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

    const canvasFactory = new NodeCanvasFactory();
    const { canvas, context } = canvasFactory.create(
        viewport.width,
        viewport.height
    );

    const renderTask = page.render({
        canvasContext: context,
        viewport,
        canvasFactory,
    });

    await renderTask.promise;

    let image =
        imgType === "jpg"
            ? canvas.toDataURL("image/jpeg")
            : canvas.toDataURL("image/png");

    return returnType === "base64" ? image : base64ToBuffer(image);
};

export const PdfToImg = PdfToImgNode;
