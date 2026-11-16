import fs from "node:fs/promises";
import path from "node:path";
import { color } from "../config/color-config.js";

export async function funcCat(args: string[]) {
  const dir = process.cwd();
  const fileName = args.find((arg) => !arg.startsWith("-"));
  const lineFlag = args.find((arg) => arg.startsWith("-lines="));
  let line: null | number = null;
  if (lineFlag) {
    line = Number(lineFlag.split("=")[1]);
  }
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
    if (line) {
      const lines = content.split(/\r?\n/);
      console.log(color.cat(lines.slice(0, line).join("\n")));
    } else {
      console.log(color.cat(content));
    }
  } catch (error) {
    console.error(`cat: '${fileName}': ${error}`);
  }
}
