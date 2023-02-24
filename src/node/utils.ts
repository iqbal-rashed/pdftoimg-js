import { DocumentInitParameters } from "pdfjs-dist/types/src/display/api";
import { OptionsType } from "./types";
import Canvas from "canvas";
import { strict as invariant } from "assert";

export const DefaultOptions: OptionsType = {
    imgType: "png",
    returnType: "base64",
    pages: "all",
    scale: 1.0,
};

export const GetSrcOptions = (
    src: string | URL | Buffer,
    options?: OptionsType
) => {
    const { documentOptions, ...rest } = {
        ...DefaultOptions,
        ...options,
    };

    let documentParams: DocumentInitParameters;

    if (src instanceof Buffer) {
        documentParams = { data: src, ...documentOptions };
    } else {
        documentParams = { url: src, ...documentOptions };
    }

    let opt: OptionsType = { ...rest };

    return { documentParams, opt };
};

export function base64ToBuffer(str: string): Buffer {
    let base64 = str.split(";base64,").pop() as string;
    return Buffer.from(base64, "base64");
}

export function rangeToArr(start: number, end: number) {
    let arr: number[] = [];
    let st = start;
    while (st <= end) {
        arr.push(st);
        st++;
    }
    return arr;
}

export class NodeCanvasFactory {
    create(
        width: number,
        height: number
    ): {
        [K in keyof {
            canvas: Canvas.Canvas | null;
            context: Canvas.CanvasRenderingContext2D | null;
        }]: NonNullable<
            {
                canvas: Canvas.Canvas | null;
                context: Canvas.CanvasRenderingContext2D | null;
            }[K]
        >;
    } {
        invariant(width > 0 && height > 0, "Invalid canvas size");
        const canvas = Canvas.createCanvas(width, height);
        const context = canvas.getContext("2d");
        return {
            canvas,
            context,
        };
    }

    reset(
        canvasAndContext: {
            canvas: Canvas.Canvas | null;
            context: Canvas.CanvasRenderingContext2D | null;
        },
        width: number,
        height: number
    ): void {
        invariant(canvasAndContext.canvas, "Canvas is not specified");
        invariant(width > 0 && height > 0, "Invalid canvas size");
        canvasAndContext.canvas.width = width;
        canvasAndContext.canvas.height = height;
    }

    destroy(canvasAndContext: {
        canvas: Canvas.Canvas | null;
        context: Canvas.CanvasRenderingContext2D | null;
    }): void {
        invariant(canvasAndContext.canvas, "Canvas is not specified");

        canvasAndContext.canvas.width = 0;
        canvasAndContext.canvas.height = 0;
        canvasAndContext.canvas = null;
        canvasAndContext.context = null;
    }
}
