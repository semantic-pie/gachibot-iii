import { BotCommandWitArguments } from "@src/processors/commandProcessor.ts";

export const fetchCurrencyRatesCommand: BotCommandWitArguments = {
  name: "fetch_currency_rates",
  description: "Фетчит курсы популярных валют и криптовалют с публичных API",
  args: [{
    value: "base",
    description: "Базовая валюта (например USD, EUR, BTC)"
  }],
  callback: async (args) => {
    console.log("CURRENCY")
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/exchange_rates`);
      if (!response.ok) throw new Error("API решило поиграть в hard mode");
      
      const rates = await response.json();
      return `Курсы валют:\n${Object.entries(rates.rates)
        .slice(0, 10)
        .map(([currency, data]) => 
          `${currency}: ${(1/data.value).toFixed(4)} ${args.base || "USD"}`
        ).join("\n")}`;
    } catch (err) {
      return `Ошибка: ${err.message}\nВините Глеба - он плохо молился API-богам`;
    }
  }
};