export const getStickerFromMessage = (
  msg: string,
): { message: string; sticker: string | undefined } => {
  const regex = /\/send_sticker\s+"([^"]+)"\s*$/m;
  const match = msg.match(regex);

  if (match) {
    const stickerId = match[1];
    const newText = msg.replace(regex, "").trim();
    return { sticker: stickerId, message: newText };
  }

  return { sticker: undefined, message: msg };
};
