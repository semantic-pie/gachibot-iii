import { ai } from "@src/ai/client.ts";
import { SYSTEM_PROMPTS } from "@src/prompts.ts";

export const shouldIAnswer = async (content?: string): Promise<number> => {
  if (!content) return 0;

  const completion = await ai.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPTS.SHOULD_ANSWER,
      },
      { role: "user", content },
    ],
  });

  const response = completion.choices[0].message.content;

  console.log("response: ", response);

  if (response) {
    try {
      return Number(response);
    } catch {
      return 0;
    }
  } else {
    return 0;
  }
};
