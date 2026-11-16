import fs from "node:fs/promises";
import path from "node:path";
import { color } from "../config/color-config.js";

export async function funcCat(args: string[]) {
  const dir = process.cwd();
  const fileName = args[0];
  if (!fileName) {
    console.error(
      "cat: provide file name or path, ex: cd file-name or file-path",
    );
    return;
  }
  const safePath = fileName.replace(/^[\\/]+/, "");
  const filePath = path.resolve(dir, safePath);
  try {
    const stats = await fs.stat(filePath);
    if (stats.isDirectory()) {
      console.log(color.error(`cat: ${color.bold(fileName)} is a directory`));
      return;
    }
    const content = await fs.readFile(filePath, "utf-8");
    console.log("\n");
    console.log(color.cat(content));
  } catch (error) {
    console.error(`cat: '${fileName}': ${error}`);
  }
}
