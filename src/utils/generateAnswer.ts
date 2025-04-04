import { ai } from "@src/ai/client.ts";
import { KvGroup, KvUser } from "@src/context.ts";
import { db } from '@src/db.ts';
import { SYSTEM_PROMPTS } from "@src/prompts.ts";

export const generateAnswerAlt = async (
  chat_id: number
): Promise<string | undefined> => {

  const chatKv = await db.get<KvGroup>(["chat", chat_id])

  const chat = chatKv.value ?? { history: [] };
  if (!chat) return;
  const users = await Promise.all(
    chat.history
      .map((item) => item.user_id)
      .filter((user) => user !== undefined)
      .map((user_id) => db.get<KvUser>(["user", user_id])) // массив промисов
  );

  
  const profiles = users
    .filter((user) => user.value !== null)
    .map((user) => user.value.profile)
    .filter((profile) => profile !== undefined);

  
    const history = chat.history.slice(-10).map((item) => ({
      ...item,
      content: item.name + ': ' + item.content
    }));


  console.log("context: ", chat?.history?.slice(-10))
  console.log("profiles: ", profiles)
  

  const completion = await ai.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPTS.YOURE_BILLY_HARRINGTON,
      },
      { role: "user", content: aboutMe(profiles) },
      {
        role: "assistant",
        content:
          "Отлично! При необходимости, буду использовать эту информацию о пользователях!",
      },
      ...(chat ? history : [])
    ],
  });

  const response = completion.choices[0].message.content;

  

  console.log("response: ", response);

  if (response) {
    return response;
  }
};

const aboutMe = (profiles?: string[]) => {
  return profiles
    ? `Вот профили пользователей в данном чате: ${profiles}`
    : "";
};
