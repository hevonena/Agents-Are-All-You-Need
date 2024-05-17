import pkg from "terminal-kit";
const { terminal: term } = pkg;
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function startTerminal() {
    term.eraseDisplay();
    term.reset();

    await term.drawImage(path.join(__dirname, "./recycler.png"), {});

    let introString = " Looking at your 🗑️  trash bin hehe 👀 \n";

    await term.spinner("asciiSpinner");
    term.bold.green(introString);

    
}
