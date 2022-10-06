import { join, resolve } from "path";
import { readdir, readdirSync, unlink } from "fs-extra";
import { createReadStream, existsSync, mkdirSync } from "fs";
import sharp from "sharp";
import { FileUpload } from "../interface/file-upload.interface";

export interface ProcessFiles {
  files: string[];
  resize: { width: number; heigth: number };
  format: keyof sharp.FormatEnum;
  pathSrc: string;
  pathOut: string;
}
export class FilesHelper {
  static deleteFiles = async (files: { [x: string]: string }) => {
    try {
      for (const file in files) {
        await unlink(resolve(files[file]));
      }
    } catch (e) {
      return e;
    }
  };

  static deleteOne = async (file: string) => {
    await unlink(resolve(file));
  };

  static listFiles = () => {
    const listFiles = readdirSync(resolve(".././images"));
    return listFiles;
  };

  static listFilesProseced = async (path: string) => {
    const listFiles = await readdir(resolve(path));
    console.log(listFiles);
    return listFiles;
  };

  static fileToBuffer = async (path: string, name: string) => {
    const fileRead = createReadStream(path);
    const transform = sharp();
    const pipe = fileRead.pipe(transform);
    const buffer = await pipe.toBuffer();
    const file: FileUpload = {
      buffer,
      originalname: name
    }
    return file

  }

  static listFolder = (path: string) => {
    return readdirSync(path, {
      withFileTypes: true,
    }).reduce((a: string[], c) => {
      c.isDirectory() && a.push(c.name);
      return a;
    }, []);
  };

  static listFilesToProcess = async (
    width: number,
    heigth: number,
    folderC: string,
    format: keyof sharp.FormatEnum
  ) => {
    const p = join(__dirname, "..", "..", "..", "images");
    const p2 = join(
      __dirname,
      "..",
      "..",
      "..",
      "outImages\\" + `${folderC}\\`
    );

    if (!existsSync(p2)) {
      mkdirSync(p2, { recursive: true });
    }
    const pp: ProcessFiles = {
      files: FilesHelper.listFiles(),
      format: format,
      pathOut: p2,
      pathSrc: p,
      resize: { width, heigth },
    };

    FilesHelper.processFiles(pp);
  };
  static processFiles = (processFiles: ProcessFiles) => {
    processFiles.files.map(async (file) => {
      const fileRead = createReadStream(`${processFiles.pathSrc}/${file}`);

      let transform = sharp();

      transform.toFormat(processFiles.format, {
        progressive: true,
      });

      transform.resize(
        processFiles.resize.width,
        processFiles.resize.heigth,
        {}
      );
      const pipe = fileRead.pipe(transform);
      const format = pipe.toFormat(processFiles.format);
      await format.toFile(
        processFiles.pathOut +
          file.split(".")[0] +
          "." +
          processFiles.format.toString()
      );
    });
  };
}
