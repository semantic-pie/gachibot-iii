import { Context } from "@grammy";

export type HistoryItem = {
  role: "user" | "assistant";
  name: string;
  userId?: number;
  content: string;
};

export interface KvUser {
  profile: string | undefined;
  history: HistoryItem[];
}

export interface KvGroup {
  history: HistoryItem[];
}

export interface CommandJson {
  name: string;
  args: { [key: string]: string };
}

interface BotConfig {
  isAdmin: boolean;
  user?: KvUser;
  botShouldReply: boolean;
  botProfile: BotProfile
}

export type BotContext = Context & {
  config: BotConfig;
};

export interface BotSticker {
  description: string;
  id: string
}

export interface BotProfile {
  name: string;
  description: string;
  stickers: BotSticker[];
  triggers: string[];
}
