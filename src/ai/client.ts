import { OpenAI } from "@openai";

const apiKey = Deno.env.get('AI_TOKEN')
const baseURL = "https://hubai.loe.gg/v1"

export const ai = new OpenAI({
  apiKey,
  baseURL
});
