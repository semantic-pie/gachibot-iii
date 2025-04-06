import { HistoryItem } from "@src/context.ts";
import { ai } from "@src/ai/client.ts";
import { SYSTEM_PROMPTS } from "@src/prompts.ts";

export const createUserProfile = async (
  history: HistoryItem[],
  profile?: string,
) => {
  const completion = await ai.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPTS.CREATE_USER_PROFILE,
      },
      {
        role: "user",
        content: `Профиль: ${profile}. История сообщений: ${
          JSON.stringify(
            history.map((item, i) => `${i}. ${item.name}: ${item.content}`),
          )
        }`,
      },
    ],
  });

  return completion.choices[0].message.content;
};
