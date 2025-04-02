import { ai } from "@src/ai/client.ts";
import { KvUser } from '@src/context.ts';
import { SYSTEM_PROMPTS } from "@src/prompts.ts";

export const generateAnswer = async (
  content?: string,
  user?: KvUser
): Promise<string | undefined> => {
  if (!content) return;


  console.log("user: ", user);

  const completion = await ai.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPTS.YOURE_BILLY_HARRINGTON,
      },
      {role: "user", content: user?.profile ?? ""},
      { role: "user", content },
    ],
  });

  const response = completion.choices[0].message.content;

  console.log("response: ", response);

  if (response) {
    return response;
  }
};
