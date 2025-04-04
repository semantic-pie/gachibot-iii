import { HistoryItem, KvGroup } from "@src/context.ts";
import { db } from "@src/db.ts";

export const addMessagesToHistory = async (
    messages: HistoryItem[],
    chat_id: number
  ) => {
    const chatKv = await db.get<KvGroup>(["chat", chat_id]);
    const chat = chatKv.value ?? { history: [] };
    chat.history.push(...messages);
    await db.set(["chat", chat_id], chat);
  };