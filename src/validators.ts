import fs from "fs";
import path from "path";

export function validateInput(value: string) {
  const inputPath = path.isAbsolute(value)
    ? value
    : path.resolve(process.cwd(), value);
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Input file does not exist: ${inputPath}`);
  }
  if (!inputPath.endsWith(".pdf")) {
    throw new Error("Input file must be a PDF.");
  }
  return inputPath;
}

export function validateImgType(value: string) {
  if (!["png", "jpg"].includes(value)) {
    throw new Error("Image type must be 'png' or 'jpg'.");
  }
  return value;
}

export function validateScale(value: string) {
  const parsed = parseFloat(value);
  if (isNaN(parsed) || parsed <= 0) {
    throw new Error("Scale must be a positive number.");
  }
  return parsed;
}

function expandRange(value: string): number[] {
  const [start, end] = value.split("..").map(Number);
  if (isNaN(start) || isNaN(end) || start > end || start <= 0) {
    throw new Error(
      "Invalid range format or range cannot include zero/negative numbers. Example: 1..3",
    );
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function validatePages(value: string) {
  if (["all", "firstPage", "lastPage"].includes(value)) return value;
  if (value.includes("..")) {
    return expandRange(value);
  }
  if (!isNaN(Number(value))) return Number(value);
  const arr = value.split(",").map((v) => Number(v.trim()));
  if (arr.some(isNaN)) {
    throw new Error("Pages must be a valid number or  list of numbers.");
  }
  return arr;
}

export function validateNameTemplate(inputPath: string, value?: string) {
  const inputFileName = path.basename(inputPath, path.extname(inputPath));

  if (value) {
    if (
      !value.includes("{i}") &&
      !value.includes("{p}") &&
      !value.includes("{ext}")
    ) {
      throw new Error(
        "Name template must include at least one of {i}, {p}, and ends with .{ext}",
      );
    }
    if (!value.endsWith(".{ext}")) {
      throw new Error("Name template must ends with .{ext}");
    }
    return value.replace(/{f}/g, inputFileName);
  } else {
    const defaultNameTemplate = `${inputFileName}-{p}.{ext}`;

    return defaultNameTemplate;
  }
}

export function validateOutput(out?: string) {
  const outputPath = out
    ? path.isAbsolute(out)
      ? out
      : path.resolve(process.cwd(), out)
    : process.cwd();
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
  return outputPath;
}

export function validateIntent(value: string) {
  if (!["display", "print", "any"].includes(value)) {
    throw new Error("Intent must be 'display', 'print', or 'any'.");
  }
  return value;
}

export function validateBackground(value: string) {
  // For CLI, we'll only accept string values for background
  // CanvasGradient and CanvasPattern are not applicable in CLI context
  if (!value) {
    return "rgb(255,255,255)"; // Default background
  }
  return value;
}
