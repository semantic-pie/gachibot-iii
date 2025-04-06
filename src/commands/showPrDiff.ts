import { BotCommandWitArguments } from "@src/processors/commandProcessor.ts";

export const showPrDiff: BotCommandWitArguments = {
  args: [{
    value: "url",
    description:
      "Ссылка на pull request в формате: https://api.github.com/repos/<repoOwner>/<repoName>/pulls/<prNumber> Замени <repoOwner>, <repoName> и <prNumber> на реальные значения.",
  }],
  name: "show_pull_request_details",
  description:
    `Когда нужно посмотреть детали pull request'а на GitHub. Если тебе прислали ссылку — передай её в команду и получи полную информацию о PR `,
  callback: async (args) => {
    if (args.url) {
      const response = await fetch(args.url, {
        headers: {
          "Authorization": `Bearer ${Deno.env.get("GITHUB_TOKEN")}`,
          "Accept": "application/vnd.github.v3.diff",
        },
      });

      if (response.ok) {
        return `Вот что у нас есть по пулл реквесту: ${await response
          .text()} \n Сделай краткую выжимку.`;
      }

      return "Не удалось получить подробности пуллреквеста. Скорее всего или протух токен или чёт упало. Вот подробности: " +
        response;
    }
    return "Не удалось получить подробности пуллреквеста. Скорее всего или протух токен или чёт упало";
  },
};
