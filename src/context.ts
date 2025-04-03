import { Context } from "@grammy";

export type HistoryItem = {
  role: 'user' | 'assistant'
  name: string
  content: string
}

export interface KvUser {
  history: HistoryItem[];
  profile: string | undefined;
}

interface BotConfig {
  isAdmin: boolean;
  isReplyMe: boolean;
  isOldMessage: boolean;
  user?: KvUser;
  shouldBreakIn: number;
}

export type BotContext = Context & {
  config: BotConfig;
};
