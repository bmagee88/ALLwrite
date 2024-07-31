import OpenAI from "openai";     
import { config } from "dotenv";
config();

const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

export async function getModifiedPrompt(prompt: string) {
  try {
    console.log("client is: ", client);
    const chatCompletion = await client.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });
    console.log("chat completion: ", chatCompletion);
    return chatCompletion;
  } catch (err) {
    console.log(err);
    throw new Error("getModifiedPrompt failed");
  }
}
