import { setPuppeteer, input, openai, image_to_base64, sleep } from '../utils.js'

const timeout = 2000;


(async () => {
    const messages = [{
        role: "system",
        content: `You are an assistant tasked with extracting specific information 
        requested by a user from an image of a webpage. Your responses should be 
        concise, limited to one sentence, and formatted as lists or short sentences 
        when appropriate. Adopt a personal tone, as if you are the user's personal 
        assistant.

        Focus on providing the relevant information related to the user's query. 
        Avoid including any extraneous details or descriptions of the page.

        If you think search result is not relevant, set "search_successful" to false
        
        Your response should be structured as a JSON object following this schema:

        {
            "information": "<relevant information>"
            "suggested_query": "<suggested search query>"
            "search_successful": <true/false>
        }
        `
    }]

    const { page } = await setPuppeteer()
    const query = await input("What do you want to search on Google?")
    let gpt_query = ""

    while (true) {
        await page.goto('https://www.google.com', {
            waitUntil: 'domcontentloaded',
            timeout: timeout
        })

        await page.type('textarea[name="q"]', gpt_query ? gpt_query : query, { delay: 100 })
        await sleep(1000)
        const feelinLucky = await page.$('input[name="btnI"]')
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle0', timeout: timeout }),
            page.evaluate(e => e.click(), feelinLucky)
        ])
        await page.screenshot({
            path: 'images/scrapper_simple.jpg',
            fullPage: true
        })

        const image = await image_to_base64('images/scrapper_simple.jpg');
        messages.push({
            role: "user",
            content: [
                {
                    type: "image_url",
                    image_url: {
                        url: image,
                    },
                },
                {
                    type: "text",
                    text:
                        "Here is a screenshot. Please find the informations asked by the user query " +
                        query,
                },
            ],
        })
        console.log("calling openai")
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            max_tokens: 1024,
            messages: messages,
            response_format: { type: "json_object" }
        })

        const answer = response.choices[0].message
        const answer_content = answer.content
        
        const answer_json = JSON.parse(answer_content)
        const information = answer_json[information]
        
        if (search_successful) {
            console.log("Search successful");
            console.log("Information: ", information);
            break
        } else {
            console.log("Search not successful");
            console.log("Suggested query: ", suggested_query);
            gpt_query = suggested_query
        }
    }
})()