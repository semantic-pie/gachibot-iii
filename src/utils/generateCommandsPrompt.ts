import type {
  BotCommandWitArguments,
  SimpleBotCommand,
} from "@src/processors/commandProcessor.ts";

export const createCommandsPrompt = (
  commandsPrompt: string,
  commands: (SimpleBotCommand | BotCommandWitArguments)[],
) => {
  return commandsPrompt.replace(
    "[[COMMANDS]]",
    `${
      commands.map((command, i) =>
        `\n${i + 1}. "${command.name}": 
Использовать когда: ${command.description}.\n${
          command.args
            ? "Если ты вызываешь эту команду, то ты должен передать следущие аругменты: \n" +
              command.args.map((arg) =>
                `  - Название переменной: ${arg.value}. Описание: ${arg.description}`
              ).join("\n")
            : ""
        }`
      ).join("\n")
    }
    `,
  );
};
