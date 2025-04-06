import { BotContext, CommandJson } from "@src/context.ts";
import { reflectionCommand } from "@src/commands/reflection.ts";
import { banUserCommand } from "@src/commands/banUser.ts";
import { showPrDiff } from "@src/commands/showPrDiff.ts";

export type BotCommandArgument = {
  description: string;
  value: string;
};

export interface SimpleBotCommand {
  name: string;
  description: string;
  args: undefined;
  callback: (ctx: BotContext) => Promise<string | undefined | void>;
}

export interface BotCommandWitArguments {
  name: string;
  description: string;
  args: BotCommandArgument[];
  callback: (
    args: { [key: string]: string },
    ctx: BotContext,
  ) => Promise<string | undefined | void>;
}

export const commands = [reflectionCommand, banUserCommand, showPrDiff];

export const processCommand = async (
  extractedCommand: CommandJson,
  ctx: BotContext,
) => {
  // commands should be registered in commands/index file
  for (const command of commands) {
    if (extractedCommand.name === command.name) {
      // if command require arguments
      if (command.args) {
        return await command.callback(extractedCommand.args, ctx);
      } else {
        return await command.callback(ctx);
      }
    }
  }
};
