import {
  createReadStream,
  emptyDir,
  PathLike,
  readdir,
  readdirSync,
  statSync,
} from "fs-extra";
import { join } from "path";
import { commerceSize } from "./constants/commerce.constant";
import { tiendaSize } from "./constants/tienda.constant";
import { Storage } from "@google-cloud/storage";
import { UploadFiles } from "./helpers/upload-files.helper";
import { FilesHelper } from "./helpers/files.helper";
import { InitHelper } from "./helpers/init.helper";
export interface FileSend {
  originalName: string;
  buffer: Buffer;
  mimetype: string;
}
async function start() {
  const p = join(__dirname, "..", "..", "outImages");
  await emptyDir(p);

  const campaing = "1";
  const branch = "commerce";
  console.log("Redimensionando imagenes");
  await InitHelper.processCommerce(campaing);
  await InitHelper.processTienda(campaing);
   console.log("Subiendo imagenes");
  const path = `${p}\\${branch}\\${campaing}`
  const folders = await FilesHelper.listFolder(path);
  console.log(folders);
  await folders.map(async (res) => {
    console.log(`${path}\\${res}\\`);
    const filess = await FilesHelper.listFilesProseced(`${path}\\${res}\\`)
  })
  // UploadFiles.upload();
}
start();
