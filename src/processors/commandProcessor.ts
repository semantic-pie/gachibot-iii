import { BotContext, CommandJson } from "@src/context.ts";
import { commands } from "@src/commands/index.ts";

export const extractCommand = (
  message: string,
): { commandJson: CommandJson | undefined; message: string } => {
  const regex = /###COMMAND_START###([\s\S]*?)###COMMAND_END###/;
  const match = message.match(regex);

  if (match) {
    const commandJson = JSON.parse(match[1].trim());
    const cleanedMessage = message.replace(regex, "").replace(/\n{2,}/g, '\n').trim();
    return { commandJson, message: cleanedMessage };
  } else {
    console.log("No command found, assume the position!");
    return { commandJson: undefined, message: message.replace(/\n{3,}/g, '\n\n') };
  }
};

export const processCommand = async (extractedCommand: CommandJson, ctx: BotContext) => {
  for (const command of commands) {
    if (extractedCommand.name === command.name) {
      if (command.args) {
        return await command.callback(extractedCommand.args)
      } else {
        return await command.callback()
      }
    }
  }
};
