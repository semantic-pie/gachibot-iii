import { OpenAI } from "@openai";

const apiKey = Deno.env.get('AI_TOKEN') ?? '<Paste your openAI api key here>'
const baseURL = "https://hubai.loe.gg/v1"

export const ai = new OpenAI({
  apiKey,
  baseURL
});
