import OpenAI from "openai";
import { image_to_base64, sleep, generate_speech, setPuppeteer, openai } from "../utils.js";
import fs from "fs";
import {downloadDir} from "./fileReading.js";
import path from "path";

// DALL-E modify image API - Works with absolute path.

export async function modify_image(imageDescription, title) {
    const openai = new OpenAI(process.env.OPENAI_API_KEY);

    const response = await openai.images.generate({
        prompt: imageDescription,
        model: "dall-e-3",
        n: 1,
        size: "1024x1024",
    });

    downloadImageFromURL(response.data[0].url, path.join(downloadDir, title+".png"));
}

export async function downloadImageFromURL(url, path) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(path, buffer);
    console.log("Image downloaded");
}

// const imagePath = path.join(downloadDir, "image.png");

// modify_image();

// downloadImageFromURL("https://oaidalleapiprodscus.blob.core.windows.net/private/org-t99RSKR5bW0lhuWQlHWow0LD/user-7Z1DWNis9zUxppWZ98L5fXw1/img-cZAQp13qm4gNzvNPgHxcgCDM.png?st=2024-05-15T14%3A38%3A42Z&se=2024-05-15T16%3A38%3A42Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-05-15T10%3A34%3A46Z&ske=2024-05-16T10%3A34%3A46Z&sks=b&skv=2021-08-06&sig=RbgRpGIbKkZ4xxcJUoEaIv%2BvU0soCQQ87I1%2Bx2%2BiAbQ%3D", imagePath);