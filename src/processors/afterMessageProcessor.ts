import { BotContext } from "@src/context.ts";
import { processBotProfileUpdate } from "@src/processors/utils/processBotProfileUpdate.ts";
import { processHistoryUpdate } from "@src/processors/utils/processHistoryUpdate.ts";

type AfterMessageProcessorArgs = {
  ctx: BotContext;
  response?: string;
};

export const afterMessageProcessor = async (
  { ctx, response }: AfterMessageProcessorArgs,
) => {
  if (!ctx?.msg) {
    console.warn("Post processing skiped");
    return;
  }

  // Post-Proccessors:
  const history = await processHistoryUpdate(ctx, response);
  if (history) await processBotProfileUpdate(history);
};
