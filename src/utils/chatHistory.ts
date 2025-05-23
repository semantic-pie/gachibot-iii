import { HistoryItem, KvGroup } from "@src/context.ts";
import { db } from "@src/db.ts";

export const addMessagesToHistory = async (
  messages: HistoryItem[],
  chat_id: number,
) => {
  const chatKv = await db.get<KvGroup>(["chat", chat_id]);
  const chat = chatKv.value ?? { history: [] };
  chat.history = chat.history.slice(-10);
  chat.history.push(...messages);
  await db.set(["chat", chat_id], chat);
  return chat.history;
};

export const clearChatHistory = async (chat_id: number) => {
  await db.set(["chat", chat_id], { history: [] });
};
