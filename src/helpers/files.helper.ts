import { resolve } from "path";
import {existsSync, readdirSync, unlink, } from "fs-extra";
import { createReadStream } from "fs";

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
    const listFiles = readdirSync(resolve("./images"));
    return listFiles;
  };
}
