require("dotenv").config();
require("colors");
const { Configuration, OpenAIApi } = require("openai");

module.exports = async (client) => {
    console.log("Initializing ChatGPT", process.env.ChatGPT)

    const setupGPTconnection = new Promise((resolve, reject) => {
        const chatGPTconfig = new Configuration({
            apiKey: process.env.chatGPT
        });
        const openai = new OpenAIApi(chatGPTconfig);
        if (openai) resolve(openai)
        else reject("Could not initialize connection to openAI server")
    })

    setupGPTconnection.then((openAI) => {
        client.openai = openAI;
        console.log("GPT Initialized".rainbow)
    }).catch((err) => {
        console.error(err);
    })
    //==================================================================
    // const completion = await openai.createCompletion({
    //     model: "text-davinci-003",
    //     prompt: message,
    //     max_tokens: 200,
    // });
    // return completion.data.choices[0].text;
}
