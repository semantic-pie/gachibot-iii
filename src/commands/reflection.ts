import { SimpleBotCommand } from "@src/commands/index.ts";
import { readDirectoryRecursively } from "@src/commands/readUtil.ts";
import { dirname } from "@std/path";


export const reflectionCommand: SimpleBotCommand = {
    args: undefined,
    name: 'reflection_moment',
    description: `Если тебя попросили прочитать свои исходники, ты можешь вызвать эту команду. Она поможет прочитать содержимое проекта и показать тебе, ты сможешь проанализировать его.`,
    callback: async () => {
        return 'Вот твои исходники: ' + await readDirectoryRecursively(dirname(new URL(Deno.mainModule).pathname) + '/src')
    }
}
