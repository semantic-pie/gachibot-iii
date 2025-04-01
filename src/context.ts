import { Context } from "@grammy";

export interface KvUser {
  history: string[];
  profile: string | undefined;
}

interface BotConfig {
  isAdmin: boolean;
  user?: KvUser;
  shouldBreakIn: boolean;
}

export type BotContext = Context & {
  config: BotConfig;
};
