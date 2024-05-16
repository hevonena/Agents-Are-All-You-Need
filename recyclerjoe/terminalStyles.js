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

    await term.drawImage(path.join(__dirname, "./recycle.png"), {
        shrink: { width: 32, height: 32 },
        y: 0,
        x: 0,
    });

    await term.spinner("asciiSpinner");
    await term(" Looking at your 🗑️  trash bin hehe 👀 ");
}
