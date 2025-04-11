import { ai } from "@src/ai/client.ts";
import { BotProfile, KvGroup, KvUser } from "@src/context.ts";
import { db } from "@src/db.ts";
import { commands } from "@src/processors/commandProcessor.ts";
import { getProfile } from "@src/processors/utils/processBotProfileUpdate.ts";
import { SYSTEM_PROMPTS } from "@src/prompts.ts";
import { clearChatHistory } from "@src/utils/chatHistory.ts";
import { extractCommand } from "@src/utils/extractCommand.ts";
import { extractSticker } from "@src/utils/extractSticker.ts";
import { createCommandsPrompt } from "@src/utils/generateCommandsPrompt.ts";

export const generateAnswer = async (
  botProfile: BotProfile,
  chat_id: number,
  commandOutput?: string,
  lastResponse?: string,
): Promise<string | undefined> => {
  const chatKv = await db.get<KvGroup>(["chat", chat_id]);

  const chat = chatKv.value ?? { history: [] };
  if (!chat) return;
  const users = await Promise.all(
    chat.history
      .map((item) => item.userId)
      .filter((user) => user !== undefined)
      .map((userId) => db.get<KvUser>(["user", userId])),
  );

  const profiles = Array.from(
    new Set(
      users
        .filter((user) => user.value !== null)
        .map((user) => user.value.profile)
        .filter((profile) => profile !== undefined),
    ),
  );

  const history = chat.history.slice(-10).map((item) => {
    return {
      ...item,
      content: item.name + ": " + extractSticker(extractCommand(item.content).message).message,
      role: item.role === "user" 
            ? item.role 
            : (item.role === "assistant" && item.name !== botProfile.name) 
                ? "user" 
                : "assistant",
    };
  });

  console.log("context: ", history);
  console.log("profiles: ", profiles);

  const memory = await getProfile();

  console.log("memory: ", memory);

  const botStickers = botProfile.stickers.length > 0 ? SYSTEM_PROMPTS.BOT_STICKERS +
  botProfile.stickers.map((sticker, id) => `
    ${id}. ${sticker.description}
    ###STICKER_START###
    ${sticker.id}
    ###STICKER_END###
    `): "";
  try {
    const completion = await ai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: botProfile.description +
            createCommandsPrompt(SYSTEM_PROMPTS.BOT_COMMANDS, commands) +
             + botStickers +
            SYSTEM_PROMPTS.MEMORY_PROMPT + memory,
        },
        { role: "user", content: aboutMe(profiles) },
        {
          role: "assistant",
          content:
            "Отлично! При необходимости, буду использовать эту информацию о пользователях!",
        },
        ...(chat ? history : []),
        ...(commandOutput
          ? [
            { role: "assistant", content: lastResponse },
            { role: "user", content: commandOutput },
          ] as {
            role: "user";
            content: string;
          }[]
          : []),
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
