import { image_to_base64, sleep, generate_speech, setPuppeteer, openai } from "../utils.js";
import { mouse, left, right, up, down, keyboard, Key, Window } from "@nut-tree-fork/nut-js";
import { openFinder, searchTrashInFinder, writeNote, imageToDesktopWallpaper, makePresentation, goToMeme } from "./keyboardFunctions.js";
import { modify_image } from "./imageTransforms.js";
import {downloadDir, readFiles, trashDir} from "./fileReading.js";
import { switchCase, parseAnswerForJoe } from "./joeCases.js";
import * as prompt from "./prompts.js";
import { startTerminal } from "./terminalStyles.js";
import path from "path";
import fs from "fs";
import chokidar from 'chokidar';

// -------- TRASH WATCHER --------
const watcher = chokidar.watch(trashDir, { persistent: true, ignoreInitial: true});

// Event listeners
watcher.on('add', (filePath) => {
        console.log(`New file added to trash: ${filePath}`);
        myNodeFunction(filePath);
    }
);

startTerminal();

async function myNodeFunction() {

    // -------- FILE READING --------
    let fileContent = await readFiles().fileContent;
    let fileName = await readFiles().fileName;

    const gptChatHistory = [];
    gptChatHistory.push(prompt.getRandomPrompt(fileName));

    gptChatHistory.push({
        role: "user",
        content: fileContent,
    });

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        max_tokens: 1024,
        response_format: { type: "json_object" },
        messages: gptChatHistory,
    });

    const message = response.choices[0].message;
    const message_text = message.content;
    const json_answer = JSON.parse(message_text);

    switchCase(await parseAnswerForJoe(json_answer));
};
