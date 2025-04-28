import fs from "fs";
import { pdfToImg } from "../src/index";
import path from "path";

async function test() {
  console.log("🔍 test() starting…");

  try {
    const OUT_DIR_PATH = path.join(__dirname, "output");
    if (!fs.existsSync(OUT_DIR_PATH)) {
      fs.mkdirSync(OUT_DIR_PATH);
    }

    const pdfData = fs.readFileSync(path.join(__dirname, "example.pdf"));

    const imgs = await pdfToImg(pdfData, {
      scale: 2,
    });

    for (let i = 0; i < imgs.length; i++) {
      const img = imgs[i];
      const base64Data = img.replace(/^data:image\/(png|jpg);base64,/, "");
      fs.writeFileSync(
        path.join(__dirname, "output", "test" + i + ".png"),
        base64Data,
        { encoding: "base64" }
      );
    }

    console.log("✅ singlePdfToImg succeeded, outsize");
  } catch (err) {
    console.error("❌ test() threw:", err);
  }
}

test().catch((err) => {
  console.error("‼ unhandled rejection in test():", err);
});
