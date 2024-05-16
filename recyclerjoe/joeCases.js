import { generate_speech } from "../utils.js";
import { modify_image } from "./imageTransforms.js";
import * as keyboardAction from "./keyboardFunctions.js";
import { trashDir } from "./fileReading.js";
import path from "path";

export async function parseAnswerForJoe(json_answer) {
    const gptResponse = {
        purpose: json_answer["purpose"],
        description: json_answer["description"],
        filename: json_answer["filename"],
        title: json_answer["title"],
        content: json_answer["content"],
        imagePrompt: json_answer["imagePrompt"],
        codePoetry: json_answer["codePoetry"],
    };

    const gptPresentation = {
        title: json_answer["title"],
        subtitle: json_answer["subtitle"],
        author: json_answer["author"],
        slide1_title: json_answer["slide1_title"],
        slide1_subtitle: json_answer["slide1_subtitle"],
        slide1_bullets: json_answer["slide1_bullets"],
        slide2_title: json_answer["slide2_title"],
        slide2_subtitle: json_answer["slide2_subtitle"],
        slide2_bullets: json_answer["slide2_bullets"],
    };

    return { gptResponse, gptPresentation };
}

export async function switchCase(parsedAnswerForJoe) {

    const gptResponse = parsedAnswerForJoe.gptResponse;
    const gptPresentation = parsedAnswerForJoe.gptPresentation;

    switch (gptResponse.purpose) {
        case "wallpaper":
            generate_speech(gptResponse.description, "onyx");
            const filePath = path.join(trashDir, gptResponse.filename);
            await keyboardAction.imageToDesktopWallpaper(filePath);
            break;
        case "logo":
            break;
        case "meme":
            generate_speech(gptResponse.description, "onyx");
            await keyboardAction.goToMeme(downloadDir);
            await modify_image(gptResponse.imagePrompt, gptResponse.title);
            break;
        case "keynote":
            generate_speech(gptResponse.description, "onyx");
            await keyboardAction.makePresentation(gptPresentation);
            break;
        case "poetic reading":
            await generate_speech(gptResponse.title, "onyx");
            generate_speech(gptResponse.content, "onyx");
            break;
        case "code poetry":
            keyboardAction.makeCodePoetry(gptResponse.codePoetry)
            break;
        case "algorithmic art":
            break;
        case "horoscope":
            generate_speech(gptResponse.description, "onyx");
            await keyboardAction.writeNote({
                title: gptResponse.title,
                content: gptResponse.content,
            });
            break;
        case "recipe":
            generate_speech(gptResponse.description, "onyx");
            await keyboardAction.writeNote({
                title: gptResponse.title,
                content: gptResponse.content,
            });
            break;
        case "poem":
            generate_speech(gptResponse.description, "onyx");
            await keyboardAction.writeNote({
                title: gptResponse.title,
                content: gptResponse.content,
            });
            break;
    }
}
