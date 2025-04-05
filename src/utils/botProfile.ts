import { HistoryItem } from "@src/context.ts";
import { ai } from "@src/ai/client.ts";
import { SYSTEM_PROMPTS } from "@src/prompts.ts";
import { db } from "@src/db.ts";

export const updateProfile = async (history: HistoryItem[]) => {
    const current = await getProfile()
    const completion = await ai.chat.completions.create({
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPTS.CREATE_BOT_PROFILE,
            },
            { role: "user", content: `Первоначальный профиль: ${current}. История сообщений: ${history.slice(-50).map(i => `role: ${i.role}; ${i.name}; ${i.content}`).join('\n')}`},
          ],
        });

    const response = completion.choices[0].message.content;

    await db.set(['bot', 'memory'], response)
}

export const getProfile = async () => {
  const memory = db.get<string>(['bot', 'memory'])

  return (await memory)?.value ?? 'Пока тут пусто'
}