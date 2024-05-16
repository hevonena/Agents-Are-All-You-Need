import fs, { read } from "fs";
import os from "os";
import path from "path";
import { image_to_base64 } from "../utils.js";

export const homeDir = os.homedir();
export const downloadDir = path.join(homeDir, "tempDownloads/");
export const trashDir = path.join(homeDir, ".Trash/");
let fileName = "";
let fileContent = [];

export async function readFiles(filePath) {
    fileContent = [];
    await readTrashFiles(filePath);
    return { fileContent, fileName };
}


async function readTrashFiles(filePath) {
    return new Promise((resolve) => {

        fs.readFile(filePath, async () => {

            var regex = /(?:\.([^.]+))?$/;
            var fileExtension = regex.exec(filePath)[1].toLowerCase();

            if (fileExtension == 'jpeg' || fileExtension == 'png' || fileExtension == 'jpg') {
                try {
                    const base64Image = await image_to_base64(filePath);
                    fileContent.push({
                        type: "image_url",
                        image_url: {
                            url: base64Image,
                        },
                    });
                } catch (error) {
                    console.error(`Error converting image to base64:`, error);
                }
            } else if (fileExtension == 'txt' || fileExtension == 'js' || fileExtension == 'html' || fileExtension == 'css') {
                fileContent.push({
                    type: "text",
                    text: fs.readFileSync(filePath, "utf8"),
                });
            }
            
            if (fileContent[0].type == "image_url") {
                fileName = path.basename(filePath);
            } else {
                fileName = "";
            }

            resolve();

        });
    });
}