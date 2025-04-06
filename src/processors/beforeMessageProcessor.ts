import { BotContext } from "@src/context.ts";
import { processHistoryUpdate } from "@src/processors/utils/processHistoryUpdate.ts";

type BeforeMessageProcessorArgs = {
  ctx: BotContext;
};

export const beforeMessageProcessor = async (
  { ctx }: BeforeMessageProcessorArgs,
) => {
  if (!ctx?.msg) {
    console.warn("Post processing skiped");
    return;
  }

  // Before-Proccessors:
  await processHistoryUpdate(ctx);
};
