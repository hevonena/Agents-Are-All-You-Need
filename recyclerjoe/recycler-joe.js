import { image_to_base64, sleep, generate_speech, setPuppeteer, openai } from "../utils.js";
import { mouse, left, right, up, down, keyboard, Key, Window } from "@nut-tree-fork/nut-js";
import pkg from "terminal-kit";
import { openFinder, searchTrashInFinder, writeNote, imageToDesktopWallpaper, makePresentation, goToMeme } from "./keyboardFunctions.js";
import { modify_image } from "./imageTransforms.js";
import {downloadDir, readFiles, trashDir} from "./fileReading.js";
import { switchCase } from "./joeCases.js";
import * as prompt from "./prompts.js";
const { terminal: term } = pkg;
import path from "path";
import fs from "fs";
import chokidar from 'chokidar';

// -------- TRASH WATCHER --------
const getTrashFiles = () => {
    return new Set(fs.readdirSync(trashDir).map(file => path.join(trashDir, file)));
};

let trashFiles = getTrashFiles();
const watcher = chokidar.watch(trashDir, { persistent: true });

// Event listeners
watcher.on('add', (filePath) => {
    if (!trashFiles.has(filePath)) {
        console.log(`New file added to trash: ${filePath}`);
        myNodeFunction(filePath);
    }
    // Update the set of trash files
    trashFiles.add(filePath);
});

const messages = [prompt.baseSystemPrompt];

async function myNodeFunction() {
    // ghost(); // go to trash and "read" files

    // -------- FILE READING --------
    let fileContent = await readFiles();
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

    // await modify_image(imagePrompt);
    // await makePresentation(presentation)
    switchCase(await parseAnswerForJoe(json_answer));
};

async function ghost() {
    await openFinder();

    await sleep(200);

    await searchTrashInFinder();

    await sleep(200);

    await keyboard.type(Key.LeftSuper, Key.A);

    // await Promise.all([
    //     term.slowTyping(description + "\n", {
    //         flashStyle: term.brightWhite,
    //         delay: 40,
    //     }),
    //     generate_speech(description, "onyx"),
    // ]);
}
