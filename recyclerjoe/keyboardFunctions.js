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
        await openFinder();
        await keyboard.type(Key.LeftSuper, Key.LeftShift, Key.G);
        await keyboard.type(filePath);
        await sleep(300);
        await keyboard.type(Key.Enter);
        await sleep(100);
        await keyboard.type(Key.LeftControl, Key.LeftAlt, Key.LeftSuper, Key.T);
    }
}

export async function openApp(appName) {
    await keyboard.type(Key.LeftSuper, Key.Space);
    await keyboard.type(appName);
    await sleep(100);
    await keyboard.type(Key.Enter);
    await sleep(100);
}

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
    while (!await checkIfKeynoteIsOpen()) {
        // await sleep(100);
    }

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
    await sleep(200);
    await keyboard.type(Key.LeftSuper, Key.LeftShift, Key.G);
    await sleep(200);
    await keyboard.type(path);
    await sleep(100);
    await keyboard.type(Key.Enter);
    await sleep(100);
    await keyboard.type(Key.Right);
    await sleep(100);

    for (let i = 0; i < 10; i++) {
        if (Math.random() > 0.5) {
            await keyboard.type(Key.Up);
        } else {
            await keyboard.type(Key.Down);
        }
        await sleep(200);
    }
}

export async function playSongOnSpotify(songName) {
    await openApp("spotify");
    while (!(await checkifWindowIsOpen("Spotify Premium"))) {}
    await sleep(1000);
    await keyboard.type(Key.LeftSuper, Key.L);
    await sleep(100);
    await keyboard.type(songName);
    await sleep(2000);
    // for loop 6 times
    for (let i = 0; i < 6; i++) {
        await keyboard.type(Key.Tab);
    }
    await sleep(500);
    console.log("pressing enter");
    await keyboard.type(Key.Enter);
    await sleep(500);
    console.log("pressing enter again");
    await keyboard.type(Key.Enter);
}

export async function checkIfKeynoteIsOpen() {
    const activeWindow = await getActiveWindow();
    const windowTitle =  await activeWindow.getTitle();
    if (windowTitle === "Open") {
        await sleep(100);
        return true;
    } else {
        await sleep(100);
        return false;
    }
}

export async function checkifWindowIsOpen(windowName) {
    const activeWindow = await getActiveWindow();
    const windowTitle =  await activeWindow.getTitle();
    if (windowTitle === windowName) {
        await sleep(100);
        return true;
    } else {
        await sleep(100);
        return false;
    }
}

export async function makeCodePoetry(codePoetry) {
    await openApp("vscode");
    await sleep(100);
    while (!await checkifWindowIsOpen("Welcome")) {}

    //new window
    await keyboard.type(Key.LeftSuper, Key.LeftShift, Key.N);
    await sleep(100);

    // new text file
    await keyboard.type(Key.LeftControl, Key.N);
    await sleep(100);

    // type code poetry
    await keyboard.type(codePoetry);
}




// async function windowName () {
//     const activeWindow = await getActiveWindow();
//     const windowTitle =  await activeWindow.getTitle();
//     return windowTitle;
// }

// setInterval((async () => {
//     console.log(await windowName());
// }), 100);