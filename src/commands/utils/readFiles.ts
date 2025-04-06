export const readDirectoryRecursively = async (
  dirPath: string,
): Promise<string> => {
  let combinedContent = "";

  for await (const entry of Deno.readDir(dirPath)) {
    const entryPath = `${dirPath}/${entry.name}`;

    if (entry.isFile) {
      try {
        const fileContent = await Deno.readTextFile(entryPath);
        combinedContent += `\n/* File: ${entryPath} */\n`;
        combinedContent += fileContent;
        combinedContent += "\n";
      } catch (error) {
        console.error(`Error reading file ${entryPath}.`, error);
      }
    } else if (entry.isDirectory) {
      combinedContent += await readDirectoryRecursively(entryPath);
    }
  }

  return combinedContent;
};
