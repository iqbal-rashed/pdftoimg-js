import fs from "fs";
import path from "path";
import { pdfToImg } from "../src/index";

async function runExample() {
  console.log("🔍 Starting PDF to Image conversion...");

  const OUT_DIR = path.join(__dirname, "output");
  const PDF_FILE = path.join(__dirname, "example.pdf");

  try {
    // Ensure output directory exists
    if (!fs.existsSync(OUT_DIR)) {
      fs.mkdirSync(OUT_DIR, { recursive: true });
      console.log(`📁 Created output directory at: ${OUT_DIR}`);
    }

    // Read PDF file
    const pdfBuffer = fs.readFileSync(PDF_FILE);

    // Convert PDF to images
    const images = await pdfToImg(pdfBuffer, {
      scale: 2,
      background: "white",
      intent: "print",
    });

    // Save images
    await Promise.all(
      images.map((base64Img, index) => {
        const cleanedBase64 = base64Img.replace(
          /^data:image\/(png|jpeg);base64,/,
          "",
        );
        const outputFilePath = path.join(OUT_DIR, `page-${index + 1}.png`);
        return fs.promises.writeFile(outputFilePath, cleanedBase64, "base64");
      }),
    );

    console.log(
      `✅ Successfully converted ${images.length} page(s). Output saved in: ${OUT_DIR}`,
    );
  } catch (error) {
    console.error("❌ Error during PDF to Image conversion:", error);
    process.exit(1);
  }
}

runExample();
