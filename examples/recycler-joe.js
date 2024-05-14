import {
    image_to_base64,
    sleep,
    generate_speech,
    setPuppeteer,
    openai,
} from "../utils.js"

import { mouse, left, right, up, down , keyboard, Key, Window} from "@nut-tree-fork/nut-js";
import os from "os";
import path from "path";

const homeDir = os.homedir();
const trashDir = path.join(homeDir, ".Trash/");


(async () => {


    await mouse.move(left(500));
    await mouse.move(up(500));
    await mouse.move(right(500));
    await mouse.move(down(500))


    await keyboard.type(Key.LeftSuper, Key.Space);

    await keyboard.type("trash");
    await sleep(100);

    await keyboard.type(Key.Enter);
    await sleep(300);

    await keyboard.type(Key.LeftSuper, Key.A);

    

})();