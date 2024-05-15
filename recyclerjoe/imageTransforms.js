import OpenAI from "openai";

// DALL-E modify image API

export async function modify_image(image_base64, prompt) {
    const openai = new OpenAI(process.env.OPENAI_API_KEY);
    
    const response = await openai.images.edit({
        image: image_base64,
        model: "dall-e-3",
        prompt: prompt,
    });
    
    return response;

    console.log(response.data);

}