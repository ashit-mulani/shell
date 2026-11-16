import fs from "node:fs";
import path from "node:path";
import { color } from "../config/color-config.js";

export async function funcLs(args: string[]) {
  const dir = args[0] || process.cwd();
  const resolvedPath = path.resolve(dir);
  try {
    const files = await fs.promises.readdir(resolvedPath, {
      withFileTypes: true,
    });
    for (const file of files) {
      console.log(
        file.isDirectory()
          ? `${color.lsDir(file.name)}/`
          : `${color.lsFile(file.name)}`,
      );
    }
  } catch (error) {
    console.error(`ls: '${dir}': ${error}`);
  }
}
