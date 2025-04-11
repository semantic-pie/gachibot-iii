

export const extractSticker = (
  message: string,
): { sticker: string; message: string } => {
  const regex = /###STICKER_START###([\s\S]*?)###STICKER_END###/;
  const match = message.match(regex);

  if (match) {
    const sticker = match[1].trim();
    const cleanedMessage = message.replace(regex, "").replace(/\n{2,}/g, "\n")
      .trim();
    return { sticker, message: cleanedMessage };
  } else {
    console.log("No sticker found, assume the position!");
    return {
      sticker: "",
      message: message.replace(/\n{3,}/g, "\n\n"),
    };
  }
};
