export const checkIsBotShouldAnswer = (content?: string): boolean => {
  if (!content) return false;

  const tokens = content
    .toLocaleLowerCase()
    .replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, "")
    .split(/\s+/);

  console.log("user input ass tokens: ", tokens);
  for (const token of tokens) {
    if (billyTriggers.includes(token)) return true;
  }

  return false;
};

const billyTriggers = [
  "билли",
  "гачи",
  "гачимучи",
  "гачи-мучи",
  "эсс",
  "херингтон",
  "босс",
  "качок",
  "легенда",
  "ван даркхолм",
  "ван",
  "темный властелин",
  "геррингтон",
  "флекс",
  "pose",
  "power",
  "unlimited power",
  "гантели",
  "жим",
  "становая",
  "присед",
  "пресс",
  "кубики",
  "пампинг",
  "накачка",
  "прокачка",
  "сушка",
];
