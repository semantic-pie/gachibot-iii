import { Bot } from "@grammy";
import { BotContext } from "@src/context.ts";
import { middleware } from "@src/middleware.ts";
import { handleMessage } from "@src/handlers/handleMessage.ts";
import { userProfile } from "@src/handlers/userProfile.ts";
import { botProfile } from "@src/handlers/botProfile.ts";
import { botTools } from "@src/handlers/botTools.ts";

const bot = new Bot<BotContext>(Deno.env.get("BOT_TOKEN") || "");

bot.use(middleware);

bot.command("my_profile", userProfile);
bot.command("bot_profile", botProfile);
bot.command("bot_tools", botTools);

bot.on("message", handleMessage);

export default bot;
