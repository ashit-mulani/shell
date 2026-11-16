import path from "node:path";
import fs from "node:fs/promises";

export async function funcRmdir(args: string[]) {
  const dir = process.cwd();
  const folderName = args[0];
  if (!folderName) {
    console.error(
      "mkdir: provide folder name or path, ex: mkdir folder-name or folder-path",
    );
    return;
  }
  const safePath = folderName.replace(/^[\\/]+/, "");
  const folderPath = path.resolve(dir, safePath);
  try {
    await fs.rm(folderPath, {
      recursive: true,
      force: false,
    });
    console.log(`directory removed: ${folderPath}`);
  } catch (error) {
    console.error(`mkdir: '${dir}': ${error}`);
  }
}
