import { BotCommandWitArguments } from "@src/commands/index.ts";

export const banUserCommand: BotCommandWitArguments = {
  args: [{
    value: "name",
    description: "Юзернейм пользователя в телеграмме. Начинается с @",
  }, {
    value: "level",
    description: "Уровень серьёзности нарушения по шкале от 1 до 10."
  }],
  name: "ban_user",
  description: `Если нужно забанить пользователя`,
  callback: async (args) => {
    console.log(`Иммитирую выполнение бана для пользователя: ${args['name']}. Уровень говножуйства: ${args['level']}/10`)
  },
};
