import { Context } from "@grammy";

export interface KvUser {
  history: string[];
  profile: string | undefined;
}

interface BotConfig {
  isAdmin: boolean;
  isOldMessage: boolean;
  user?: KvUser;
  shouldBreakIn: number;
}

export type BotContext = Context & {
  config: BotConfig;
};
