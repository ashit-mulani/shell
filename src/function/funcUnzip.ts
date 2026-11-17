import AdmZip from "adm-zip";
import fs from "node:fs";
import path from "node:path";
import { color } from "../config/color-config.js";

export async function funcUnzip(args: string[]) {
  const dir = process.cwd();
  const argsPath = args.find((arg) => !arg.startsWith("-"));
  const atFlag = args.find((arg) => arg.startsWith("-at="));
  if (!argsPath) {
    console.error(`unzip: provide file path of .zip`);
    return;
  }
  const safePath = argsPath?.replace(/^[\\/]+/, "");
  const resolvedPath = path.resolve(dir, safePath ? safePath : "");
  let atPath = dir;
  if (atFlag) {
    const atValue = path.resolve(
      process.cwd(),
      atFlag?.slice(4)?.replace(/^["']|["']$/g, ""),
    );
    const isDirectory =
      fs.existsSync(atValue) && fs.statSync(atValue).isDirectory();
    atPath = isDirectory ? atValue : path.dirname(atValue);
  }
  try {
    console.log(color.loading("Unzipping files..."));
    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`ZIP file not found: ${resolvedPath}`);
    }
    const stat = fs.statSync(resolvedPath);
    if (!stat.isFile()) {
      throw new Error("ZIP path must be a file.");
    }
    fs.mkdirSync(atPath, { recursive: true });
    const zip = new AdmZip(resolvedPath);
    zip.extractAllTo(atPath, /* overwrite */ true);
    console.log(
      `Unzipped ${color.zipPathDim(resolvedPath)} ${color.dim("->")} ${color.unzipPath(atPath)}`,
    );
  } catch (error) {
    console.error(`unzip: '${dir}': ${error}`);
  }
}
