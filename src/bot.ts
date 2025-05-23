import { Bot } from "@grammy";
import { BotContext } from "@src/context.ts";
import { botProfile } from "@src/handlers/botProfile.ts";
import { botTools } from "@src/handlers/botTools.ts";
import { handleMessage } from "@src/handlers/handleMessage.ts";
import { userProfile } from "@src/handlers/userProfile.ts";
import { middleware } from "@src/middleware.ts";
import { BillyProfile, JarvisProfile, KodomiProfile } from "@src/profiles.ts";
import { addProfile } from "@src/utils/botProfiles.ts";

const bot = new Bot<BotContext>(Deno.env.get("BOT_TOKEN") || "");

await addProfile(JarvisProfile);
await addProfile(BillyProfile);
await addProfile(KodomiProfile);

bot.use(middleware);

bot.command("my_profile", userProfile);
bot.command("bot_profile", botProfile);
bot.command("bot_tools", botTools);

bot.on("message", handleMessage);

export default bot;
