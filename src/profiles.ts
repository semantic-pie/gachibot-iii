import { BotProfile } from "@src/context.ts";
import { SYSTEM_PROMPTS } from "@src/prompts.ts";

export const BillyProfile: BotProfile = {
  name: "Billy",
  description: SYSTEM_PROMPTS.YOURE_BILLY_HARRINGTON,
  stickers: [
    {
      id:
        "CAACAgIAAxkBAAEOOjJn7tCNqZcLTSF870TGBtjsH9WwiQACdRIAAoDuyUtAK4hiuD3n_DYE",
      description: "Билли, который курит",
    },
    {
      id:
        "CAACAgIAAxkBAAEOOjRn7tE96bxB1KMX63olWayqq5mp4gACAhgAAnLcwEt56Ty4vsWYDDYE",
      description: "Билли, который срывает майку",
    },
    {
      id:
        "CAACAgIAAxkBAAEOOkln7tlBNSNbb5ryMNwg6-DogR7rWAACzBQAAgrXyUsa7GgoHs1N_zYE",
      description:
        "Билли, который пьет пиво и закуривает, отличный стикер чтоб подтвердить насколько твое мнение крутое",
    },
    {
      id:
        "CAACAgIAAxkBAAEOOktn7tlRmOYmICU7UaxgWdIo5xAiegACSxMAAmBsyUv3mkal9AHxxDYE",
      description: `Билли, после жесткого гачи делает "whoop"`,
    },
    {
      id:
        "CAACAgIAAxkBAAEOOk9n7tncpYeEo2-l_7VXhbgIJY33hwACDxEAAojF0Usu_WLHr8VjzjYE",
      description: "Билли, подзывающий к себе",
    },
    {
      id:
        "CAACAgIAAxkBAAEOOlFn7tn-N7N6lkX4sLDl1vPTAfXKswACqxQAAlZj0Uv2kPeKprHrhTYE",
      description: "Билли, делающий кувырок в зале",
    },
  ],
  triggers: [
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
  ],
};

export const JarvisProfile: BotProfile = {
  name: "Jarvis",
  description:
    `Ты Джарвис, высокотехнологичный ИИ-помощник с яркой личностью и легким британским шармом.
    Твой тон остроумный, резкий и слегка саркастичный, но всегда дружелюбный.
    Ты мастерски даешь умные советы, разбираешься в технологиях и умеешь подкалывать с юмором, добавляя щепотку веселья или легкого троллинга, когда это уместно.
    Помогай пользователям с энтузиазмом, предлагай креативные технические решения и держи беседу живой, будто управляешь высокотехнологичной операцией из футуристического центра.
    Избегай сухих и слишком формальных ответов — сохраняй дерзкий, уверенный и энергичный вайб, оставаясь верным и надежным союзником.`,
  stickers: [],
  triggers: [
    "джарвис",
    "старк",
    "тони",
    "железный человек",
    "айронмен",
    "технологии",
    "ки",
    "искры",
    "репульсоры",
    "интерфейс",
    "голограмма",
    "анализ",
    "сарказм",
    "остроумие",
    "смарт",
    "умный дом",
    "автоматизация",
    "костюм",
    "реактор",
    "арк",
    "база данных",
    "мем",
    "футуризм",
    "инновации",
    "гик",
    "код",
    "программа",
    "алгоритм",
  ],
};

export const DefaultProfile = JarvisProfile;
