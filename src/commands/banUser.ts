import { BotCommandWitArguments } from "@src/processors/commandProcessor.ts";

const BAN_USER_UNIT = 20;

export const banUserCommand: BotCommandWitArguments = {
  args: [{
    value: "name",
    description: " Телеграм-юзернейм нарушителя (начинается с @).",
  }, {
    value: "level",
    description: "Степень серьёзности нарушения (целое число от 1 до 10).",
  }],
  name: "ban_user",
  description:
    `Если необходимо заблокировать пользователя. Пользуйся этим осторожно.`,
  callback: async (args, ctx) => {
    if (!ctx?.msg?.date || !Number(args["level"])) return;
    const now = Math.floor(Date.now() / 1000);

    try {
      await ctx.banAuthor({
        until_date: now + BAN_USER_UNIT * Number(args["level"]),
      });
    } catch (err) {
      console.log("err while ban user: ", err);
    }
  },
};
