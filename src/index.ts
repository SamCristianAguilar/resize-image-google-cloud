import { FilesHelper } from "./helpers/files.helper";
import { createReadStream, emptyDir } from "fs-extra";
import { join, resolve } from "path";
import sharp from "sharp";
export interface FileSend {
  originalName: string;
  buffer: Buffer;
  mimetype: string;
}
function start() {
  console.log("hola mundossss");

  FilesHelper.listFiles().map(async (file, index) => {
    const p = join(__dirname, "..", "images");
    const p2 = join(__dirname, "..", "outImages\\");

    await emptyDir(p2)
    const fileRead = createReadStream(`${p}/${file}`);

    let transform = sharp();

    transform.toFormat("webp", {
      progressive: true,
    });

    transform.resize(1000, 1000, {
      withoutEnlargement: true,
    });
    const gg = fileRead.pipe(transform);
    const format = "webp";
    const ll = gg.toFormat(format, { palette: true });
    const ld = await ll.toFile(p2 + file.split(".")[0] + "ddddd." + format);
    console.log(ld.format);
    
  });
}
start();
