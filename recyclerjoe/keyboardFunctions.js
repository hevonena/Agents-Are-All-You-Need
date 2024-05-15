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

export async function makePresentation(presentation) {
    await keyboard.type(Key.LeftSuper, Key.Space);
    await keyboard.type("keynote");
    await sleep(100);
    await keyboard.type(Key.Enter);
    await sleep(800);

    await keyboard.type(Key.LeftSuper, Key.N);
    await sleep(100);
    await keyboard.type(Key.Enter);
    await sleep(200);

    // first slide
    await keyboard.type(Key.Tab);
    await keyboard.type(presentation.title);
    await sleep(100);

    await keyboard.type(Key.Escape);
    await keyboard.type(Key.Tab);
    await keyboard.type(Key.Tab);
    await sleep(100);

    await keyboard.type(presentation.subtitle);
    await sleep(100);

    // second slide
    await keyboard.type(Key.LeftSuper, Key.LeftShift, Key.N);

    await keyboard.type(Key.Tab);
    await keyboard.type(presentation.slide1_title);
    await sleep(100);

    await keyboard.type(Key.Escape);
    await keyboard.type(Key.Tab);
    await keyboard.type(Key.Tab);
    await sleep(100);

}