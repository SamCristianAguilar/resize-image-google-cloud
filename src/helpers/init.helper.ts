import { commerceSize } from "../constants/commerce.constant";
import { tiendaSize } from "../constants/tienda.constant";
import { FilesHelper } from "./files.helper";

export class InitHelper {

    static processCommerce = async (campaing: string) => {

        await commerceSize.map(async (size) => {
            await FilesHelper.listFilesToProcess(
              size.width,
              size.height,
              `commerce\\${campaing}\\${size.folder}`,
              "jpeg"
            );
          });
    }
    static processTienda = async (campaing: string) => {
       await tiendaSize.map(async (size) => {
            await FilesHelper.listFilesToProcess(
              size.width,
              size.height,
              `tienda\\${campaing}\\${size.folder}`,
              "webp"
            );
          });
    }
    static uploadCommerce = () => {}
    static uploadTienda = () => {}
}