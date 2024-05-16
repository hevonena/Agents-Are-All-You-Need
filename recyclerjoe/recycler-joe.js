import { openai, generate_speech } from "../utils.js";
import { readFiles, trashDir } from "./fileReading.js";
import { switchCase, parseAnswerForJoe } from "./joeCases.js";
import * as prompt from "./prompts.js";
import { startTerminal } from "./terminalStyles.js";
import chokidar from 'chokidar';

// -------- TRASH WATCHER --------
const watcher = chokidar.watch(trashDir, { persistent: true, ignoreInitial: true, ignored:  /^\..*/});

// Event listeners
watcher.on('add', (filePath) => {
        console.log(`New file added to trash: ${filePath}`);
        myNodeFunction(filePath);
    }
);

startTerminal();

generate_speech("Yoooo broooo, I'm Recycler Joe, I'm here to help you recycle your trash. I can help you with images, text files, and more. Just drag and drop your files into the trash and I'll take care of the rest. hahahahaha", "onyx");

async function myNodeFunction() {

    // -------- FILE READING --------
    let { fileContent, fileName } = await readFiles();

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
