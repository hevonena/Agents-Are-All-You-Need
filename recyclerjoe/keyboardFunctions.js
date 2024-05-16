import { mouse, left, right, up, down, keyboard, Key, Window, getActiveWindow } from "@nut-tree-fork/nut-js";
import { image_to_base64, sleep, generate_speech, setPuppeteer, openai } from "../utils.js";
import path from "path";
import { homeDir, trashDir } from "./fileReading.js";

keyboard.config.autoDelayMs = 100;

export async function openFinder() {
    await keyboard.type(Key.LeftSuper, Key.Space);
    await keyboard.type("finder");
    await sleep(100);
    await keyboard.type(Key.Enter);
    sleep(100);
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
    console.log(presentation);
    await keyboard.type(Key.LeftSuper, Key.Space);
    await keyboard.type("keynote");
    await sleep(100);
    await keyboard.type(Key.Enter);
    await sleep(2500);

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
    await keyboard.type(presentation.subtitle);
    await sleep(100);

    await keyboard.type(Key.Escape);
    await keyboard.type(Key.Tab);
    await keyboard.type(Key.Tab);
    await keyboard.type(Key.Tab);
    await keyboard.type(presentation.author);
    await sleep(100);

    // second slide
    await keyboard.type(Key.LeftSuper, Key.LeftShift, Key.N);

    await keyboard.type(Key.Tab);
    await keyboard.type(presentation.slide1_title);
    await sleep(100);

    await keyboard.type(Key.Escape);
    await keyboard.type(Key.Tab);
    await keyboard.type(Key.Tab);
    await keyboard.type(presentation.slide1_subtitle);
    await sleep(100);

    await keyboard.type(Key.Escape);
    await keyboard.type(Key.Tab);
    await keyboard.type(Key.Tab);
    await keyboard.type(Key.Tab);
    for (const point of presentation.slide1_bullets) {
        await keyboard.type(Key.Enter);
        await keyboard.type(point);
      }
    await sleep(100);

    // third slide
    await keyboard.type(Key.LeftSuper, Key.LeftShift, Key.N);

    await keyboard.type(Key.Tab);
    await keyboard.type(presentation.slide2_title);
    await sleep(100);

    await keyboard.type(Key.Escape);
    await keyboard.type(Key.Tab);
    await keyboard.type(Key.Tab);
    await keyboard.type(presentation.slide2_subtitle);
    await sleep(100);

    await keyboard.type(Key.Escape);
    await keyboard.type(Key.Tab);
    await keyboard.type(Key.Tab);
    await keyboard.type(Key.Tab);
    for (const point of presentation.slide2_bullets) {
        await keyboard.type(Key.Enter);
        await keyboard.type(point);
      }
    await sleep(100);

    // present
    await keyboard.type(Key.LeftAlt, Key.LeftSuper, Key.P);
    await keyboard.type(Key.Left);
    await keyboard.type(Key.Left);
    await keyboard.type(Key.Left);
}

export async function goToMeme(path) {
    await openFinder();
    await keyboard.type(Key.LeftSuper, Key.LeftShift, Key.G);
    await keyboard.type(path);
    await sleep(100);
    await keyboard.type(Key.Enter);
}

export async function checkIfKeynoteIsOpen() {
    const activeWindow = await getActiveWindow();
    const windowTitle =  await activeWindow.getTitle();
    if (windowTitle === "Open") {
        sleep(100);
        return true;
    } else {
        sleep(100);
        return false;
    }
}