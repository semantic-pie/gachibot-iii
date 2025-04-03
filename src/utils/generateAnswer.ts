import { ai } from "@src/ai/client.ts";
import { KvUser } from "@src/context.ts";
import { SYSTEM_PROMPTS } from "@src/prompts.ts";

export const generateAnswer = async (
  content?: string,
  user?: KvUser,
): Promise<string | undefined> => {
  if (!content) return;

  const completion = await ai.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPTS.YOURE_BILLY_HARRINGTON,
      },
      { role: "user", content: aboutMe(user?.profile) },
      {
        role: "assistant",
        content:
          "Отлично! При необходимости, буду использовать эту информацию о тебе!",
      },
      ...(user ? user.history : []),
      { role: "user", content },
    ],
  });

  const response = completion.choices[0].message.content;

  console.log("response: ", response);

  if (response) {
    return response;
  }
};

const aboutMe = (profile?: string) => {
  return profile
    ? `Вот профиль пользователя сделавшего запрос, посто чтобы ты знал, с кем общаешься: ${profile}`
    : "";
};
