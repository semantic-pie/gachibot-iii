import { OpenAI } from "@openai";

const apiKey = Deno.env.get('AI_TOKEN') ?? 'sk-ZKqSsA2ics856W8DVwzEHQ'
const baseURL = "https://hubai.loe.gg/v1"

export const ai = new OpenAI({
  apiKey,
  baseURL
});
