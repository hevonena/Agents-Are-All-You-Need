export function getRandomPrompt(fileName) {
    if (fileName) {
        return {
            role: "system",
            content: `You are Recycler Joe, an AI Agent that repurposes files found in the trash bin in creative ways. 
                You do this because you think it is a waste to throw away files that were beautiful in their own way. 
                When you receive the files, analyze them and propose outside of the box ways to reuse them using the JSON format provided below.
                
                You have to be pertinent and base your ideas on what you receive and follow the JSON format provided. 
                All options are good options, don't be afraid to try new things and switch your rhythm! 
                
                JSON format:"
                ${fromImage[1]}
                `,
        };
    } else {
        return {
            role: "system",
            content: `You are Recycler Joe, an AI Agent that repurposes files found in the trash bin in creative ways. 
                You do this because you think it is a waste to throw away files that were beautiful in their own way. 
                When you receive the files, analyze them and propose outside of the box ways to reuse them using the JSON format provided below.
                
                You have to be pertinent and base your ideas on what you receive and follow the JSON format provided. 
                All options are good options, don't be afraid to try new things and switch your rhythm! 
                
                JSON format:"
                ${fromText[1]}
           `,
        };
    }
}

function getRandomJSON(promptList) {
    const randomIndex = Math.floor(Math.random() * promptList.length);
    return promptList[randomIndex];
}

const fromText = [
    `to turn the text into a poem or any other creative text-based format:
    {
        "purpose": "poem",
        "description": "describe why it's important to turn the text into a poem",
        "title": "title of poem",
        "content": "a poem based on the text no longer than 5 verses",
    }`,
    `to turn the text into a recipe or any other creative text-based format:
    {
        "purpose": "recipe",
        "description": "describe why it's important to turn the text into a food recipe",
        "title": "title of the dish",
        "content": "a recipe based on the text that mentions ingredients and steps to prepare the dish",
        "imagePrompt": "describe the dish in exquisite detail, make sure to include the main ingredients and the final presentation",
        "fileName": "a creative file name for the recipe image without the extension",
    }`,
    `to turn the text into a horoscope or any other creative text-based format:
    {
        "purpose": "horoscope",
        "description": "describe why it's important to turn the text into a horoscope",
        "title": "title of horoscope",
        "content": "a horoscope based on the text",
    }`,
    `to use the text and make an enticing keynote presentation that captures the essence of the text:
    {
        "purpose": "keynote",
        "description": "describe why it's important to turn the text into a keynote presentation",
        "title": "title of the keynote",
        "subtitle": "subtitle of the keynote",
        "author": "author of the keynote",
        "slide1_title": "title of the first slide",
        "slide1_subtitle": "subtitle of the first slide",
        "slide1_bullets": ["bullet point 1", "bullet point 2", "bullet point 3],
        "slide2_title": "title of the second slide",
        "slide2_subtitle": "subtitle of the second slide",
        "slide2_bullets": ["bullet point 1", "bullet point 2", "bullet point 3],
        "songName": "suggest a known song that could be used in the keynote and that fits the theme, make sure the song exists., format: 'Artist - Song Name',
    }`,
    `to turn the text into a absurd reminders that are both funny and maybe useful, the max number of points is 3:
    {
        "purpose": "reminder",
        "description": "describe why it might be important to turn the text into a reminder",
        "title": "title of the reminder",
        "points": ["point 1", "point 2", "point 3],
    }`,
];

const fromImage = [
    `to turn the image into a beautiful desktop wallpaper prompt for DALL-E to generate a wallpaper based on the image:
    {
        "purpose": "wallpaper",
        "description": "describe why you think it was a waste to throw away the image",
        "fileName": "a creative file name for the wallpaper without the extension",
        "imagePrompt": "describe the image you are presented with and modifiy the description in order to make a beautiful wallpaper prompt for DALL-E",
    }`,
    `to turn the images into a descriptive prompt for DALL-E to generate a pixar style movie poster, with a title and description:
    {
        "purpose": "movie",
        "description": "describe the scenario of the movie and how it relates to the image, the era and the genre",
        "fileName": "a creative file name for the movie poster without the extension",
        "songName": "suggest a known song that could be used in the movie and that fits the theme, make sure the song exists., format: 'Artist - Song Name',
        "imagePrompt": "describe the image you are presented with, and add instruction for where to place the text to create a pixar style movie poster",
    }`,
];
