import pkg from "terminal-kit";
const { terminal: term } = pkg;
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function startTerminal() {
    term.clear();
    term.hideCursor();

    let middleOfScreenX = await Math.round(term.width / 2);
    let middleOfScreenY = await Math.round(term.height / 2);

    await term.drawImage(path.join(__dirname, "./recycler.png"), {
        shrink: { width: 32, height: 32 },
    });

    await term.spinner("asciiSpinner");
    await term.bold.green(" Looking at your 🗑️  trash bin hehe 👀 \n");
}
