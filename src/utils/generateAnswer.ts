import { ai } from "@src/ai/client.ts";
import { KvGroup, KvUser } from "@src/context.ts";
import { db } from "@src/db.ts";
import { SYSTEM_PROMPTS } from "@src/prompts.ts";
import { getProfile } from "@src/utils/botProfile.ts";
import { clearChatHistory } from "@src/utils/chatHistory.ts";
import {
  BotCommandWitArguments,
  commands,
  SimpleBotCommand,
} from "@src/commands/index.ts";

export const generateAnswer = async (
  chat_id: number,
  commandOutput?: string,
  lastResponse?: string
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

  const history = chat.history.slice(-10).map((item) => ({
    ...item,
    content: item.name + ": " + item.content,
  }));

  console.log("context: ", chat?.history?.slice(-10));
  console.log("profiles: ", profiles);

  const memory = await getProfile();

  console.log("memory: ", memory);

  try {
    const completion = await ai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPTS.YOURE_BILLY_HARRINGTON +
            createCommandsPrompt(SYSTEM_PROMPTS.BOT_COMMANDS, commands) +
            SYSTEM_PROMPTS.BOT_STICKERS +
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
            { role: "assistant", content: lastResponse},
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

const createCommandsPrompt = (
  commandsPrompt: string,
  commands: (SimpleBotCommand | BotCommandWitArguments)[],
) => {
  return commandsPrompt.replace(
    "[[COMMANDS]]",
    `${
      commands.map((command, i) =>
        `\n${i + 1}. **${command.name}**. 
Использовать когда: ${command.description}.\n${
          command.args
            ? "Если ты вызываешь эту команду, то ды ложен передать следущие аругменты: \n" +
              command.args.map((arg, i) =>
                ` ${
                  i + 1
                }. Название переменной: ${arg.value}. Описание её значения: ${arg.description}`
              ).join("\n")
            : ""
        }`
      ).join("\n")
    }
    \n
    `,
  );
};
