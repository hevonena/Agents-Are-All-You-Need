import { image_to_base64, sleep, generate_speech, setPuppeteer, openai } from "../utils.js";
import { mouse, left, right, up, down, keyboard, Key, Window } from "@nut-tree-fork/nut-js";
import pkg from "terminal-kit";
import { openFinder, searchTrashInFinder, writeNote } from "./keyboardFunctions.js";
import { readFiles } from "./fileReading.js";
import * as prompt from "./prompts.js";
const { terminal: term } = pkg;

// -------- FILE READING --------

export const fileContent = [];
await readFiles(fileContent);

// -------- OPENAI API + OS KEYSTROKES ETC... --------

// our main array containing our entire chat history
const messages = [prompt.baseSystemPrompt];

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