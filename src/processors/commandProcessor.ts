import { BotContext, CommandJson } from "@src/context.ts";

export const extractCommand = (
  message: string,
): { commandJson: CommandJson | undefined; message: string } => {
  const regex = /###COMMAND_START###([\s\S]*?)###COMMAND_END###/;
  const match = message.match(regex);

  if (match) {
    const commandJson = JSON.parse(match[1].trim());
    const cleanedMessage = message.replace(regex, "").trim();
    return { commandJson, message: cleanedMessage };
  } else {
    console.log("No command found, assume the position!");
    return { commandJson: undefined, message };
  }
};

export const processCommand = async (command: CommandJson, ctx: BotContext) => {
  switch (command.type) {
    case "ban_user":
      await ctx.reply("Executing command for banning user: " + command.content);
      break;
    case "ban_all_users":
      await ctx.reply("Executing command for banning all users");
      break;
    default:
      console.log("Unknown command type: " + command.type);
      break;
  }
};
