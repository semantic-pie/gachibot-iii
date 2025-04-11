import { BotProfile } from "@src/context.ts";
import { db } from "@src/db.ts";
import { DefaultProfile } from "@src/profiles.ts";

export const getCurrentProfile = async (chatId: number) => {
  const memory = db.get<BotProfile>(["bot", "chat",`${chatId}`, "currentProfile"]);
  return (await memory)?.value ?? undefined;
};

export const getDefaultProfile = () => {
  return DefaultProfile;
};

export const changeBotProfile = async (newProfileName: string, chatId: number): Promise<void> => {
    const profilesObj = (await db.get<Record<string, BotProfile>>(["bot", "profiles"])).value 
      ?? {};
    
    const profile = profilesObj[newProfileName];
    
    if (!profile) {
        throw new Error(`Profile with name ${newProfileName} not found`);
    }
    
    await db.set(["bot", "chat",`${chatId}`, "currentProfile"], profile);
  };

export const addProfile = async (profile: BotProfile): Promise<void> => {
    const profilesObj = (await db.get<Record<string, BotProfile>>(["bot", "profiles"])).value 
      ?? {};
    
    profilesObj[profile.name] = profile;
    
    await db.set(["bot", "profiles"], profilesObj);
  };
