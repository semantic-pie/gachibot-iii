import { Context } from "@grammy";

export interface KvUser {
  history: string[];
  userName: string;
  profile: string | undefined;
}

interface BotConfig {
  isAdmin: boolean;
  user?: KvUser;
  shouldBreakIn: number;
}

export type BotContext = Context & {
  config: BotConfig;
};
