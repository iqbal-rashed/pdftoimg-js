import path from "path";
import { pdfToImg } from ".";
import { program, validatePrompts } from "./prompts";
import { getPagesArray } from "./utils";
import fs from "fs";

program.parse(process.argv);

async function init() {
  try {
    const opts = validatePrompts(program.opts());

    console.log("Processing...");

    const images = await pdfToImg(opts.inputPath, {
      imgType: opts.imgType,
      scale: opts.scale,
      pages: opts.pages,
    });

    const pagesArray = getPagesArray(opts.pages, images.length);

    const saveImage = async (
      img: Buffer | string,
      pageNumber: number,
      index: number
    ) => {
      const fileName = opts.nameTemplate
        .replace(/{i}/g, (index + 1).toString())
        .replace(/{p}/g, pageNumber.toString())
        .replace(/{ext}/g, opts.imgType);
      const filePath = path.join(opts.outputPath, fileName);
      const data =
        typeof img === "string"
          ? Buffer.from(img.split(",")[1], "base64")
          : img;
      fs.writeFileSync(filePath, data);
      console.log(`Saved: ${filePath}`);
    };

    pagesArray.forEach((p, i) => {
      const str = images[i];
      saveImage(str, p, i);
    });
  } catch (error: any) {
    console.error(error.message);
  }
}

init();
