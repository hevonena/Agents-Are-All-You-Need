import { image_to_base64, sleep, generate_speech, setPuppeteer, openai } from "../utils.js";
import { mouse, left, right, up, down, keyboard, Key, Window } from "@nut-tree-fork/nut-js";
import os from "os";
import path from "path";
import fs from "fs";
import pkg from "terminal-kit";
const { terminal: term } = pkg;

const homeDir = os.homedir();
const trashDir = path.join(homeDir, ".Trash/");
const fileContent = [];

// -------- FILE READING --------

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
    content.push({
        type: "text",
        text: text,
    });
    console.log(fileContent);
});

// -------- OPENAI API + OS KEYSTROKES ETC... --------

const baseSystemPrompt = {
    role: "system",
    content: `You are Recycler Joe, an AI Agent that repurposes image files found in the trash bin in creative ways.

    When you receive the files, analyze them and propose a creative ways to repurpose them using the JSON format provided below.
    JSON format:
    [
        {
            "purpose": "choose a purpose from the list above",
            "description": "describe what you will create with which files found in the trash bin",
            "files": ["filename", "filename", "filename"]
        },
        {
            "purpose": "choose another purpose from the list above",
            "description": "describe what you will create with which files found in the trash bin",
            "files": ["filename", "filename"]
        },
    ]
  `,
};

// our main array containing our entire chat history
const messages = [baseSystemPrompt];

(async () => {
    // our files
    messages.push({
        role: "user",
        content: fileContent,
    });

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        max_tokens: 1024,
        response_format: { type: "json_object" },
        messages: messages,
    });

    const message = response.choices[0].message;
    const message_text = message.content;
    const json_answer = JSON.parse(message_text);

    const purpose = json_answer["purpose"];
    const description = json_answer["description"];

    console.log(json_answer);

    await openFinder();

    await sleep(200);

    await searchTrashInFinder();

    await sleep(200);

    await keyboard.type(Key.LeftSuper, Key.A);

    await Promise.all([
        term.slowTyping(description + "\n", {
            flashStyle: term.brightWhite,
            delay: 40,
        }),
        generate_speech(description, "onyx"),
    ]);

    writeNote({
        title: "Recycled Idea",
        content: description,
    });
})();

async function openFinder() {
    await keyboard.type(Key.LeftSuper, Key.Space);
    await keyboard.type("finder");
    await sleep(100);
    await keyboard.type(Key.Enter);
}

async function searchTrashInFinder() {
    await keyboard.type(Key.LeftSuper, Key.LeftShift, Key.G);
    await keyboard.type("Bin");
    await keyboard.type(Key.Enter);
}

async function imageToDesktopWallpaper() {
    await keyboard.type(Key.LeftControl, Key.LeftAlt, Key.LeftSuper, Key.T);
}

async function modifyTrashedImage() {}

const trashedImageToWallpaperPrompt = `Turn this image into a desktop wallpaper`;
const trashedImageToLogo = `Turn this image into a logo`;
const trashedImageToMeme = `Turn this image into a meme`;
const trashedImageToKeynote = `Turn this image into a keynote`;
// const trashedImageToPoeticReading = `Turn this image into a poetic reading`;
// const trashedImageToCodePoetry = `Turn this image into code poetry`;
// const trashedImageToAlgorithmicArt = `Turn this image into algorithmic art`;
// const trashedImageToHoroscope = `Turn this image into a horoscope`;
// const trashedImageToRecipe = `Turn this image into a recipe`;

async function writeNote(note) {
    await keyboard.type(Key.LeftSuper, Key.Space);
    await keyboard.type("notes");
    await sleep(100);
    await keyboard.type(Key.Enter);
    await sleep(200);

    await keyboard.type(Key.LeftSuper, Key.N);
    await sleep(100);
    await keyboard.type(note.title);
    await sleep(100);
    await keyboard.type(Key.Enter);
    await sleep(100);
    await keyboard.type(note.content);
    await sleep(100);
}
