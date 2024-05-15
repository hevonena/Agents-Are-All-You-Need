import { image_to_base64, sleep, generate_speech, setPuppeteer, openai } from "../utils.js";
import { mouse, left, right, up, down, keyboard, Key, Window } from "@nut-tree-fork/nut-js";
import pkg from "terminal-kit";
import { openFinder, searchTrashInFinder, writeNote, imageToDesktopWallpaper } from "./keyboardFunctions.js";
import { readFiles } from "./fileReading.js";
import * as prompt from "./prompts.js";
const { terminal: term } = pkg;
import { trashDir } from "./fileReading.js";
import path from "path";

// -------- OPENAI API + OS KEYSTROKES ETC... --------

// our main array containing our entire chat history
const messages = [prompt.baseSystemPrompt];

(async () => {
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
})();

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