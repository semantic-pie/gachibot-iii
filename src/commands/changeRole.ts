import { BotCommandWitArguments } from "@src/processors/commandProcessor.ts";
import { changeBotProfile } from "@src/utils/botProfiles.ts";


export const changeBotRoleCommand: BotCommandWitArguments = {
  args: [{
    value: "name",
    description: "Имя роли, роли бывают такие как: Jarvis, Billy",
  }
],
  name: "change_role",
  description:
    `Если пользователь хочет общаться с другим ботом.`,
  callback: async (args, ctx) => {
    try {
      await changeBotProfile(args["name"], ctx.msg?.chat.id || 0)
      return `Профиль бота изменен успешно на ${args["name"]}`;
    } catch (err) {
      console.log("err while change role: ", err);
    }
  },
};