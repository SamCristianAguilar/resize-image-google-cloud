import { Storage } from "@google-cloud/storage";
import { join } from "path";
import { FileUpload } from "../interface/file-upload.interface";

const serviceKey = join(__dirname, "..", "./config/keys.json");

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: "nova-364623",
});
export class UploadFiles {

    static upload = (file: FileUpload) => new Promise((resolve, reject) => {
        const { originalname, buffer } = file
            console.log(serviceKey);
    })

}