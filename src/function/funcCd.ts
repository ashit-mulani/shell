import path from "node:path";
import fs from "node:fs/promises";

export async function funcCd(args: string[]) {
  const dir = process.cwd();
  const folderName = args[0];
  if (!folderName) {
    console.error("cd: provide folder name, ex: cd folder-name");
    return;
  }
  const folderPath = path.resolve(dir, folderName);
  try {
    const stats = await fs.stat(folderPath);
    if (!stats.isDirectory()) {
      console.error(`cd: not a directory: ${folderName}`);
      return;
    }
    process.chdir(folderPath);
    console.log(`In: ${folderName}`);
  } catch (error) {
    console.error(`cd: '${dir}': ${error}`);
  }
}
