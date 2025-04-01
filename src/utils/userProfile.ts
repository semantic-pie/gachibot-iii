import type { BotContext, KvUser } from "@src/context.ts";
import { db } from "@src/db.ts";
import { ai } from "@src/ai/client.ts";

const getUserKey = (id: string | number) => {
  return ["users", String(id)];
};

export const updateProfile = async (
  ctx: BotContext,
): Promise<KvUser | undefined> => {
  let user = undefined;
  if (ctx.msg?.from?.id) {
    const userKey = getUserKey(ctx.msg.from.id);
    const userWrapper = await db.get<KvUser>(userKey);
    if (!userWrapper.value) {
      user = { history: [ctx.msg.text!], profile: undefined };
      await db.set(userKey, user);
    } else {
      if (userWrapper.value.history.length > 10) {
        user = {
          history: [ctx.msg.text],
          profile: await createProfile(userWrapper.value.history),
        } as KvUser;
        await db.set(userKey, user);
      } else {
        user = {
          history: [...userWrapper.value.history, ctx.msg.text],
          profile: userWrapper.value.profile,
        } as KvUser;
        await db.set(userKey, user);
      }
    }
  }
  return user;
};

const createProfile = async (history: string[]) => {
  const completion = await ai.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      {
        role: "system",
        content:
          "Сделай краткую выжимку или характиристику пользователя по его последним сообщениям. Пострарайся кратко, так чтобы потом можно было на это ссылаться.",
      },
      { role: "user", content: history.join(", ") },
    ],
  });

  return completion.choices[0].message.content;
};
