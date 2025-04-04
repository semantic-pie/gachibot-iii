import { Context } from "@grammy";

export type HistoryItem = {
  role: 'user' | 'assistant'
  name: string
  user_id?: number
  content: string
}

export interface KvUser {
  profile: string | undefined;
  history: HistoryItem[];
}

export interface KvGroup {
  history: HistoryItem[];
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
