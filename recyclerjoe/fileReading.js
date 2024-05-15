import fs, { read } from "fs";
import os from "os";
import path from "path";
import { image_to_base64 } from "../utils.js";

export const homeDir = os.homedir();
export const downloadDir = path.join(homeDir, "tempDownloads/");
export const trashDir = path.join(homeDir, ".Trash/");
const fileContent = [];

export async function readFiles() {
    await readTrashFiles();
    return fileContent;
}


async function readTrashFiles() {
    return new Promise((resolve) => {

    fs.readdir(trashDir, async (err, files) => {
        
        if (err) {
            console.error("Error reading the trash directory:", err);
            return;
        }
        const allFiles = files.filter((file) => !/^\./.test(file));
        const imageFiles = files.filter((file) => /\.(jpg|jpeg|png)$/i.test(file));
        const textFiles = files.filter((file) => /\.(txt|js|html|)$/i.test(file));
        let text = "image file names in order: ";

        for (let i = 0; i < imageFiles.length; i++) {
            try {
                const base64Image =  await image_to_base64(path.join(trashDir, imageFiles[i]));
                fileContent.push({
                    type: "image_url",
                    image_url: {
                        url: base64Image,
                      },
                });
                text += imageFiles[i] + ", "
            } catch (error) {
                console.error(`Error converting image ${imageFiles[i]} to base64:`, error);
            }
        }
        for (let i = 0; i < textFiles.length; i++) {
            try {
                const textFile = fs.readFileSync(path.join(trashDir, textFiles[i]), "utf8");
                text += "file" + i + ", filename: " + textFiles[i] + ", content: " + textFile;
            } catch (error) {
                console.error(`Error reading text file ${textFiles[i]}:`, error);
            }
        }
    
        fileContent.push({
            type: "text",
            text: text,
        });

        resolve();

        });
    });
}