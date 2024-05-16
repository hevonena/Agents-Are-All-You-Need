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
        const imageFiles = files.filter((file) => /\.(jpg|jpeg|png)$/i.test(file));
        const textFiles = files.filter((file) => /\.(txt|js|html|py)$/i.test(file));
        let text = "image file names in order: ";

        const imageFilesWithStats = await Promise.all(imageFiles.map(async (file) => {
            const filePath = path.join(trashDir, file);
            const stats = await fs.promises.stat(filePath);
            return { file, mtime: stats.mtime };
        }));

        const sortedImageFiles = imageFilesWithStats.sort((a, b) => b.mtime - a.mtime);
        let n = 3;
        const lastNImages = sortedImageFiles.slice(0, n).map((fileInfo) => fileInfo.file);

        for (const imageFile of lastNImages) {
            try {
                const base64Image =  await image_to_base64(path.join(trashDir, imageFile));
                fileContent.push({
                    type: "image_url",
                    image_url: {
                        url: base64Image,
                      },
                });
                text += imageFile + ", "
            } catch (error) {
                console.error(`Error converting image ${imageFile} to base64:`, error);
            }
        }
        text += "next are the text files: ";
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