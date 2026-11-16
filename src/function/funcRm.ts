import path from "node:path";
import fs from "node:fs/promises";

export async function funcRm(args: string[]) {
  const dir = process.cwd();
  const fileName = args[0];
  if (!fileName) {
    console.error("rm: provide file name, ex: rm file-name");
    return;
  }
  const filePath = path.resolve(dir, fileName);
  try {
    await fs.unlink(filePath);
    console.log(`file removed: ${fileName}`);
  } catch (error) {
    console.error(`rm: '${dir}': ${error}`);
  }
}
