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
  isReplyMe: boolean;
  isOldMessage: boolean;
  user?: KvUser;
  shouldBreakIn: boolean;
}

export type BotContext = Context & {
  config: BotConfig;
};
