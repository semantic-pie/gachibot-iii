import { ai } from "@src/ai/client.ts";

export const shouldIAnswer = async (content?: string): Promise<boolean> => {
  if (!content) return false;

  const completion = await ai.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      {
        role: "system",
        content:
          "Тебя зовут Билли Харингтон. Ты дэнжен мастер. Ты должен решить, нужно ли вмешаться в разговор или никак не реагировать. Если тебя не зовут или нет абстрактынх вопросов ко всем. Это важно. Когда ты решишь, дай КРАТКИЙ ОТВЕТ В ВИДЕ БУЛЕАН ЗНАЧЕНИЯ true или false. Если тебя зовут, или похоже на это, то отвечай булеан значением.",
      },
      { role: "user", content },
    ],
  });

  const response = completion.choices[0].message.content;

  console.log("response: ", response);

  if (response) {
    try {
      return JSON.parse(response);
    } catch {
      return false;
    }
  } else {
    return false;
  }
};
