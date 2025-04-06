import { readDirectoryRecursively } from "@src/commands/utils/readFiles.ts";
import { dirname } from "@std/path";
import { SimpleBotCommand } from "@src/processors/commandProcessor.ts";

export const reflectionCommand: SimpleBotCommand = {
  args: undefined,
  name: "reflection_moment",
  description:
    `Когда тебя просят "почитать свои исходники" — смело вызывай эту команду. Она прочитает содержимое проекта, предоставит тебе всю нужную информацию и поможет разобраться в коде.`,
  callback: async () => {
    return "Вот твои исходники: " +
      await readDirectoryRecursively(
        dirname(new URL(Deno.mainModule).pathname) + "/src",
      );
  },
};
