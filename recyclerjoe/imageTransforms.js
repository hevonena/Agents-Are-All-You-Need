import OpenAI from "openai";
import { image_to_base64, sleep, generate_speech, setPuppeteer, openai } from "../utils.js";
import fs from "fs";
import 

// DALL-E modify image API - Works with absolute path.

export async function modify_image(imagePath, prompt) {
    const openai = new OpenAI(process.env.OPENAI_API_KEY);

    const response = await openai.images.edit({
        image: fs.createReadStream(imagePath),
        model: "dall-e-2",
        prompt: prompt,
    });

    console.log(response.data);
    return response;
}

export async function downloadImageFromURL(url, path) {
    const response = await fetch(url);
    const buffer = await response.buffer();
    fs.writeFileSync(path, buffer);
    console.log("Image downloaded");
}

downloadImageFromURL("https://example.com/image.jpg", );

// const tempImage = modify_image("path/to/image.jpg", prompt.imageToMakeBackground);