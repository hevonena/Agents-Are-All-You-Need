import pkg from "terminal-kit";
const { terminal: term } = pkg;

export function startTerminal() {
    // Set the title of the terminal etc...
    term.clear();
    term.spinner("asciiSpinner");
}