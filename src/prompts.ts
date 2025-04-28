import { Command } from "commander";
import {
  validateImgType,
  validateInput,
  validateNameTemplate,
  validateOutput,
  validatePages,
  validateScale,
} from "./validators";
import { defaultOptions } from "./utils";
import { PagesType } from "./types";

export const program = new Command();

program
  .name("pdftoimg")
  .description("Convert PDF pages to images (png/jpg)")
  .requiredOption("-i, --input <input>", "Input PDF file path")
  .option(
    "-o, --out <outputDir>",
    "Directory to save output images (default: current directory)",
  )
  .option(
    "-t, --imgType <type>",
    "Image type: png or jpg",
    String(defaultOptions.imgType),
  )
  .option(
    "-s, --scale <scale>",
    "Scale factor (positive number)",
    String(defaultOptions.scale),
  )
  .option(
    "-p, --pages <pages...>",
    "Pages to convert: 'all', 'firstPage', 'lastPage', numbers or ranges like 1..3",
    String(defaultOptions.pages),
  )
  .option(
    "-n, --name <template>",
    "Naming template for output files (use {i} for index, {p} for page number, {ext} for extension, {f} for filename)",
  );

export interface CLIOptions {
  input: string;
  out?: string;
  imgType: string;
  scale: string | number;
  pages: string | number;
  name?: string;
}

export function validatePrompts(opts: CLIOptions) {
  const inputPath = validateInput(opts.input);
  const outputPath = validateOutput(opts.out);
  const imgType = validateImgType(opts.imgType) as "jpg" | "png";
  const scale = validateScale(String(opts.scale));
  const pages = validatePages(String(opts.pages)) as PagesType;

  const nameTemplate = validateNameTemplate(inputPath, opts.name);

  return { inputPath, outputPath, imgType, scale, pages, nameTemplate };
}
