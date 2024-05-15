import { mouse, left, right, up, down, keyboard, Key, Window } from "@nut-tree-fork/nut-js";
import { image_to_base64, sleep, generate_speech, setPuppeteer, openai } from "../utils.js";
import path from "path";
import { homeDir, trashDir } from "./fileReading.js";

keyboard.config.autoDelayMs = 100;

export async function openFinder() {
    await keyboard.type(Key.LeftSuper, Key.Space);
    await keyboard.type("finder");
    await sleep(100);
    await keyboard.type(Key.Enter);
}

export async function searchTrashInFinder() {
    await keyboard.type(Key.LeftSuper, Key.LeftShift, Key.G);
    await keyboard.type(trashDir);
    await sleep(100);
    await keyboard.type(Key.Enter);
}

export async function imageToDesktopWallpaper(filePath) {
    if (filePath !== undefined) {
        await keyboard.type(Key.LeftSuper, Key.Space);
        await sleep(100);
        await keyboard.type(filePath);
        await sleep(300);
        await keyboard.type(Key.Enter);
        await sleep(100);
        await keyboard.type(Key.LeftControl, Key.LeftAlt, Key.LeftSuper, Key.T);
    }
}

export async function modifyTrashedImage() {}

export async function writeNote(note) {
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