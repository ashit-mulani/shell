import path from "node:path";
import fs from "node:fs/promises";

export async function funcMkdir(args: string[]) {
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
    await fs.mkdir(folderPath, {
      recursive: true,
    });
    console.log(`directory created: ${folderPath}`);
  } catch (error) {
    console.error(`mkdir: '${dir}': ${error}`);
  }
}
