

export const checkIsBotShouldAnswer = (triggers: string[], content?: string): boolean => {
  if (!content) return false;

  const tokens = content
    .toLocaleLowerCase()
    .replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, "")
    .split(/\s+/);

  console.log("user input ass tokens: ", tokens);
  for (const token of tokens) {
    if (triggers.includes(token)) return true;
  }

  return false;
};


