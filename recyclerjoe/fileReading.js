import fs from "fs";
import os from "os";
import path from "path";
import { image_to_base64 } from "../utils.js";

const homeDir = os.homedir();
export const trashDir = path.join(homeDir, ".Trash/");

export async function readFiles(fileContent) {

    fs.readdir(trashDir, async (err, files) => {
        if (err) {
            console.error("Error reading the trash directory:", err);
            return;
        }
    
        const imageFiles = files.filter((file) => /\.(jpg|jpeg|png)$/i.test(file));
        const textFiles = files.filter((file) => /\.(txt|js|html|)$/i.test(file));
        
        for (let i = 0; i < imageFiles.length; i++) {
            try {
                const base64Image = await image_to_base64(path.join(trashDir, imageFiles[i]));
                fileContent.push({
                    type: "image_url",
                    image_url: base64Image,
                });
            } catch (error) {
                console.error(`Error converting image ${imageFiles[i]} to base64:`, error);
            }
        }
        let text = "";
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

    });
}
