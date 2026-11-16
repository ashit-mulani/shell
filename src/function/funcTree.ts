import fs from "node:fs";
import path from "node:path";
import { color } from "../config/color-config.js";

export async function funcTree(args: string[]) {
  const dir = process.cwd();
  let argsPath = args.find((arg) => !arg.startsWith("-"));
  const rFlag = args.includes("-r");
  const maxFlag = args.find((arg) => arg.startsWith("-max="));
  const safePath = argsPath?.replace(/^[\\/]+/, "");
  const resolvedPath = path.resolve(dir, safePath ? safePath : "");
  let maxIteration: null | number = null;
  if (maxFlag) {
    maxIteration = Number(maxFlag.split("=")[1]);
  }
  try {
    await ls(resolvedPath, rFlag ? "-r" : undefined, "", maxIteration);
  } catch (error) {
    console.error(`tree: '${dir}': ${error}`);
  }
}

async function ls(
  resolvedPath: string,
  rflag: string | undefined,
  prefix = "",
  maxIteration: number | null,
): Promise<void> {
  let files = await fs.promises.readdir(resolvedPath, {
    withFileTypes: true,
  });
  for (let i = 0; i < (maxIteration ? maxIteration : files.length); i++) {
    const file = files[i];
    if (!file) {
      return;
    }
    const isLast = i === files.length - 1;
    const branch = isLast ? "└── " : "├── ";
    const nextPrefix = prefix + (isLast ? "    " : "│   ");
    console.log(
      color.treeBranch(prefix) +
        color.treeBranch(branch) +
        (file.isDirectory()
          ? color.lsDir(file.name) + "/"
          : color.lsFile(file.name)),
    );
    if (file.isDirectory() && rflag === "-r") {
      await ls(
        path.join(resolvedPath, file.name),
        rflag,
        nextPrefix,
        maxIteration,
      );
    }
  }
}
