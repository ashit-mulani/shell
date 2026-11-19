import fs from "node:fs/promises";
import path from "node:path";
import { color } from "../config/color-config.js";
import { isSamePath } from "../util/is-same-path.js";

export async function funcCp(args: string[]) {
  const dir = process.cwd();
  const [srcArg, destArg] = args.filter((arg) => !arg.startsWith("-"));
  const fFlag = args.includes("-f");
  if (!srcArg || !destArg) {
    console.error(
      "cp: provide source and destination, ex: cp source-path destination-path",
    );
    return;
  }
  const safeSrcPath = srcArg.replace(/^[\\/]+/, "");
  const safeDestPath = destArg.replace(/^[\\/]+/, "");
  const srcPath = path.resolve(dir, safeSrcPath);
  let destPath = path.resolve(dir, safeDestPath);
  try {
    const srcStat = await fs.stat(srcPath);
    const destStat = await fs.stat(destPath).catch(() => null);
    if (destStat?.isDirectory()) {
      destPath = path.join(destPath, path.basename(srcPath));
    }
    if (isSamePath(srcPath, destPath)) {
      console.error(
        `cp: source and destination are the same: ${color.path(srcPath)}`,
      );
      return;
    }
    if (srcStat.isDirectory()) {
      await fs.cp(srcPath, destPath, {
        recursive: true,
        force: fFlag,
        errorOnExist: !fFlag,
      });
    } else {
      await fs.copyFile(
        srcPath,
        destPath,
        fFlag ? 0 : fs.constants.COPYFILE_EXCL,
      );
    }
    console.log(`Copied: ${color.path(srcPath)} -> ${color.path(destPath)}`);
  } catch (error) {
    console.error(`cp: '${dir}': ${error}`);
  }
}
