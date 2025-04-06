import { reflectionCommand } from "@src/commands/reflection.ts";
import { banUserCommand } from "@src/commands/banUser.ts";
import { showPrDiff } from "@src/commands/showPrDiff.ts";

export type BotCommandArgument = {
    description: string
    value: string
}

export interface SimpleBotCommand {
    name: string;
    description: string
    args: undefined
    callback: () =>  Promise<string | undefined | void> 
}

export interface BotCommandWitArguments {
    name: string;
    description: string
    args: BotCommandArgument[],
    callback: (args: {[key:string]: string}) => Promise<string | undefined | void> 
}

export const commands = [reflectionCommand, banUserCommand, showPrDiff]
