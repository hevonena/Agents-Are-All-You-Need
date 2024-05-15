import { image_to_base64, sleep, generate_speech, setPuppeteer, openai } from "../utils.js";
import { mouse, left, right, up, down, keyboard, Key, Window } from "@nut-tree-fork/nut-js";
import pkg from "terminal-kit";
import { openFinder, searchTrashInFinder, writeNote, imageToDesktopWallpaper, makePresentation } from "./keyboardFunctions.js";
import { readFiles } from "./fileReading.js";
import * as prompt from "./prompts.js";
const { terminal: term } = pkg;
import { trashDir } from "./fileReading.js";
import path from "path";
import fs from "fs";
import chokidar from 'chokidar';
import { json } from "express";

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

  // -------- OPENAI API + OS KEYSTROKES ETC... --------

  // our main array containing our entire chat history
const messages = [prompt.baseSystemPrompt];

async function myNodeFunction() {
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

    const purpose = json_answer["purpose"];
    const description = json_answer["description"];
    const filename = json_answer["filename"];
    const title = json_answer["title"];
    const content = json_answer["content"];
    const prompt = json_answer["prompt"];
    const presentation = {
        title: json_answer["title"],
        subtitle: json_answer["subtitle"],
        slide1_title: json_answer["slide1_title"],
        slide1_subtitle: json_answer["slide1_subtitle"],
        slide1_bullets: json_answer["slide1_bullets"],
        slide2_title: json_answer["slide2_title"],
        slide2_subtitle: json_answer["slide2_subtitle"],
        slide2_bullets: json_answer["slide2_bullets"],
    }

    console.log(json_answer);

    // ghost();

    switch (purpose) {
        case "wallpaper":
            const filePath = path.join(trashDir, filename);
            await imageToDesktopWallpaper(filePath);
            break;
        case "logo":
            
            break;
        case "meme":
            
            break;
        case "keynote":
            makePresentation(presentation);
            break;
        case "poetic reading":
            
            break;
        case "code poetry":
            
            break;
        case "algorithmic art":
            
            break;
        case "horoscope":
            await writeNote({
                title: title,
                content: content,
            });
            break;
        case "recipe":
            await writeNote({
                title: title,
                content: content,
            });
            break;
        case "poem":
            await writeNote({
                title: title,
                content: content,
            });
            break;

    }
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