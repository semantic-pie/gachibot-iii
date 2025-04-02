const dbPath = "./database/db";

await Deno.mkdir("./database", { recursive: true });

export const db = await Deno.openKv(dbPath);
