import { BotCommandWitArguments } from "@src/commands/index.ts";

const GITHUB_TOKEN = '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'

export const showPrDiff: BotCommandWitArguments = {
  args: [{
    value: "url",
    description: "URL ссылка на пулл реквест в формате https://api.github.com/repos/${repoOwner}/${repoName}/pulls/${prNumber} Вместо <repoOwner> <repoName> <prNumber> подставь нужные значения.",
  }],
  name: "show_pull_request_details",
  description: `Когда тебя просят посмотреть пулл реквест на гитхабе и кидают ссылку. Это возможность посмотреть PULL REQUEST, если у тебя есть ссылка на него. Используй когда тебе это нужно. `,
  callback: async (args) => {
    console.log('EXECUTED START: ', args)
    if (args.url) {
      const response = await fetch(args.url, {
        headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3.diff',
        },
      });

      
      console.log(response)

      if (response.ok) {
        const keke = await response.text()

        console.log('keke: ', keke)
        return `Вот что у нас есть по пулл реквесту: ${keke} \n Сделай краткую выжимку.`
      }

      return 'Не удалось получить подробности пуллреквеста. Скорее всего или протух токен или чёт упало. Вот подробности: '+ response

    }
    return 'Не удалось получить подробности пуллреквеста. Скорее всего или протух токен или чёт упало'
  },
};
