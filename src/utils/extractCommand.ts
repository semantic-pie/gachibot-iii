import { CommandJson } from "@src/context.ts";

export const extractCommand = (
  message: string,
): { commandJson: CommandJson | undefined; message: string } => {
  const regex = /###COMMAND_START###([\s\S]*?)###COMMAND_END###/;
  const match = message.match(regex);

  if (match) {
    const commandJson = JSON.parse(match[1].trim());
    const cleanedMessage = message.replace(regex, "").replace(/\n{2,}/g, "\n")
      .trim();
    return { commandJson, message: cleanedMessage };
  } else {
    console.log("No command found, assume the position!");
    return {
      commandJson: undefined,
      message: message.replace(/\n{3,}/g, "\n\n"),
    };
  }
};
