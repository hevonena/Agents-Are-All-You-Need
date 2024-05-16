export async function switchCase(purpose) {
    switch (purpose) {
        case "wallpaper":
            generate_speech(description, "onyx");
            const filePath = path.join(trashDir, filename);
            await imageToDesktopWallpaper(filePath);
            break;
        case "logo":
            break;
        case "meme":
            generate_speech(description, "onyx");
            await goToMeme(downloadDir);
            await modify_image(imagePrompt, title);
            break;
        case "keynote":
            generate_speech(description, "onyx");
            await makePresentation(presentation);
            break;
        case "poetic reading":
            await generate_speech(title, "onyx");
            generate_speech(content, "onyx");
            break;
        case "code poetry":
            break;
        case "algorithmic art":
            break;
        case "horoscope":
            generate_speech(description, "onyx");
            await writeNote({
                title: title,
                content: content,
            });
            break;
        case "recipe":
            generate_speech(description, "onyx");
            await writeNote({
                title: title,
                content: content,
            });
            break;
        case "poem":
            generate_speech(description, "onyx");
            await writeNote({
                title: title,
                content: content,
            });
            break;
    }
}
