import { ai } from "@src/ai/client.ts";
import { KvGroup, KvUser } from "@src/context.ts";
import { db } from "@src/db.ts";
import { SYSTEM_PROMPTS } from "@src/prompts.ts";
import { getProfile } from "@src/utils/botProfile.ts";
import { clearChatHistory } from "@src/utils/chatHistory.ts";

export const generateAnswer = async (
  chat_id: number
): Promise<string | undefined> => {
  const chatKv = await db.get<KvGroup>(["chat", chat_id]);

  const chat = chatKv.value ?? { history: [] };
  if (!chat) return;
  const users = await Promise.all(
    chat.history
      .map((item) => item.userId)
      .filter((user) => user !== undefined)
      .map((userId) => db.get<KvUser>(["user", userId]))
  );

  const profiles = Array.from(
    new Set(
      users
        .filter((user) => user.value !== null)
        .map((user) => user.value.profile)
        .filter((profile) => profile !== undefined)
    )
  );

  const history = chat.history.slice(-10).map((item) => ({
    ...item,
    content: item.name + ": " + item.content,
  }));

  console.log("context: ", chat?.history?.slice(-10));
  console.log("profiles: ", profiles);

  const memory = await getProfile()

  console.log('memory: ', memory)

  try {
    const completion = await ai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPTS.YOURE_BILLY_HARRINGTON + SYSTEM_PROMPTS.BOT_COMMANDS + SYSTEM_PROMPTS.BOT_STICKERS + SYSTEM_PROMPTS.MEMORY_PROMPT + memory,
        },
        { role: "user", content: aboutMe(profiles) },
        {
          role: "assistant",
          content:
            "Отлично! При необходимости, буду использовать эту информацию о пользователях!",
        },
        ...(chat ? history : []),
      ],
    });

    const response = completion.choices[0].message.content;

    console.log("response: ", response);

    if (response) {
      return response;
    }
  } catch {
    clearChatHistory(chat_id);
    return;
  }
};

const aboutMe = (profiles?: string[]) => {
  return profiles ? `Вот профили пользователей в данном чате: ${profiles}` : "";
};
