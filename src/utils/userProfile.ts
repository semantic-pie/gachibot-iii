import type { BotContext, HistoryItem, KvUser } from "@src/context.ts";
import type { User } from "@grammy/types";
import { ai } from "@src/ai/client.ts";
import { db } from "@src/db.ts";
import { SYSTEM_PROMPTS } from "@src/prompts.ts";

export const updateProfile = async (
  ctx: BotContext,
): Promise<KvUser | undefined> => {
  if (!ctx.msg?.from?.id) return;

  const userFromKv = await db.get<KvUser>(["user", ctx.msg.from.id]);

  let user = userFromKv.value ?? undefined;

  if (!user) {
    user = await createNewUser(ctx.msg.from);
  }

  if (ctx.msg.text) {
    if (
      ctx.msg.reply_to_message?.from?.id === ctx.me.id &&
      ctx.msg.reply_to_message?.text
    ) {
      user.history.push({
        role: "assistant",
        name: 'Билли',
        content: ctx.msg.reply_to_message.text,
      });
    }

    user.history.push({ role: "user", content: ctx.msg.text, name: ctx.from?.first_name ?? '' });
  }

  if (user.history.length > 10) {
    const newProfile = await createProfile(user.history, user.profile);
    if (newProfile) {
      user.history = [];
      user.profile = newProfile;
    } else {
      console.warn(`Failed to update User: @${ctx.msg.from.username}`);
      user.history = user.history.slice(0, Math.ceil(user.history.length / 2));
    }
  }

  await db.set(["user", ctx.msg.from.id], user);

  return user;
};

const createNewUser = async (user: User): Promise<KvUser> => {
  const profile = `
  Стартовая характеристика пользователя:
  Имя: ${user.first_name} ${user.last_name}
  Никнейм: ${user.username}
  `;

  const newUser = { history: [], profile };

  const result = await db.set(["user", user.id], newUser);

  if (result.ok) {
    console.log(
      `New User created: @${user.username} - ${user.first_name} ${user.last_name}`,
    );
    return newUser;
  } else {
    throw Error("Error to create User.");
  }
};

const createProfile = async (history: HistoryItem[], profile?: string) => {
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
