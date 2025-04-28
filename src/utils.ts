import { Options, PagesType } from "./types";

export const defaultOptions: Required<Options> = {
  imgType: "png",
  pages: "all",
  scale: 1.0,
  documentOptions: {},
};

export const rangeToArr = (start: number, end?: number): number[] => {
  const from = end !== undefined ? start : 1;
  const to = end !== undefined ? end : start;
  return Array.from({ length: to - from + 1 }, (_, i) => from + i);
};

export function getPagesArray(pages: PagesType, numPages: number) {
  return pages === "firstPage"
    ? [1]
    : pages === "lastPage"
    ? [numPages]
    : typeof pages === "number"
    ? [Math.max(1, pages)]
    : Array.isArray(pages)
    ? pages.length
      ? pages
      : [1]
    : typeof pages === "object"
    ? rangeToArr(pages.startPage ?? 1, pages.endPage ?? numPages)
    : rangeToArr(1, numPages);
}

export function isTypedArrayStrict(
  value: unknown
): value is
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array {
  return (
    value instanceof Int8Array ||
    value instanceof Uint8Array ||
    value instanceof Uint8ClampedArray ||
    value instanceof Int16Array ||
    value instanceof Uint16Array ||
    value instanceof Int32Array ||
    value instanceof Uint32Array ||
    value instanceof Float32Array ||
    value instanceof Float64Array
  );
}
