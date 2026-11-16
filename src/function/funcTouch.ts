import path from "node:path";
import fs from "node:fs/promises";

export async function funcTouch(args: string[]) {
  const dir = process.cwd();
  const fileName = args[0];
  if (!fileName) {
    console.error("touch: provide file name, ex: touch file-name");
    return;
  }
  const filePath = path.resolve(dir, fileName);
  try {
    await fs.writeFile(filePath, "", {
      flag: "wx",
    });
    console.log(`file created: ${fileName}`);
  } catch (error) {
    console.error(`touch: '${dir}': ${error}`);
  }
}
