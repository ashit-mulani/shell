import fs from "node:fs";
import path from "node:path";
import { color } from "../config/color-config.js";
import { formatSize } from "../util/format-size.js";

export async function funcTree(args: string[]) {
  const dir = process.cwd();
  let argsPath = args.find((arg) => !arg.startsWith("-"));
  const rFlag = args.includes("-r");
  const sFlag = args.includes("-s");
  const maxFlag = args.find((arg) => arg.startsWith("-max="));
  const safePath = argsPath?.replace(/^[\\/]+/, "");
  const resolvedPath = path.resolve(dir, safePath ? safePath : "");
  let maxIteration: null | number = null;
  if (maxFlag) {
    maxIteration = Number(maxFlag.split("=")[1]);
  }
  try {
    await ls(resolvedPath, rFlag ? "-r" : undefined, sFlag, "", maxIteration);
  } catch (error) {
    console.error(`tree: '${dir}': ${error}`);
  }
}

async function ls(
  resolvedPath: string,
  rflag: string | undefined,
  sFlag: boolean,
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
    let fileSize = "";
    if (sFlag && file.isFile()) {
      try {
        const stats = await fs.promises.stat(
          path.join(resolvedPath, file.name),
        );
        fileSize = color.treeBranch(` (${formatSize(stats.size)})`);
      } catch {
        fileSize = color.treeBranch(" (size unavailable)");
      }
    }
    console.log(
      color.treeBranch(prefix) +
        color.treeBranch(branch) +
        (file.isDirectory()
          ? color.lsDir(file.name) + "/"
          : color.lsFile(file.name)) +
        color.dim(fileSize),
    );
    if (file.isDirectory() && rflag === "-r") {
      await ls(
        path.join(resolvedPath, file.name),
        rflag,
        sFlag,
        nextPrefix,
        maxIteration,
      );
    }
  }
}
