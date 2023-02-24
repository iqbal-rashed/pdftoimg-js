import { DocumentInitParameters } from "pdfjs-dist/types/src/display/api";
import { OptionsType } from "./types";

export const DefaultOptions: OptionsType = {
    imgType: "png",
    returnType: "base64",
    pages: "all",
    scale: 1.0,
};

export const GetSrcOptions = (
    src: string | URL | ArrayBuffer | File,
    options?: OptionsType
) => {
    const { documentOptions, ...rest } = {
        ...DefaultOptions,
        ...options,
    };

    let documentParams: DocumentInitParameters;

    if (src instanceof ArrayBuffer) {
        documentParams = { data: src, ...documentOptions };
    } else if (src instanceof File) {
        let newSrc = URL.createObjectURL(src);
        documentParams = { url: newSrc, ...documentOptions };
    } else {
        documentParams = { url: src, ...documentOptions };
    }

    let opt: OptionsType = { ...rest };

    return { documentParams, opt };
};

export function base64ToBuffer(str: string): ArrayBuffer {
    let base64 = str.split(";base64,").pop() as string;
    return base64ToArrayBuffer(base64);
}

function base64ToArrayBuffer(base64: string) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
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
