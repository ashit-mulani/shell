import path from "node:path";
import AdmZip from "adm-zip";
import fs from "node:fs";
import { color } from "../config/color-config.js";

export async function funcZip(args: string[]) {
  const dir = process.cwd();
  const argsPath = args.find((arg) => !arg.startsWith("-"));
  const exFlag = args.find((arg) => arg.startsWith("-ex="));
  const atFlag = args.find((arg) => arg.startsWith("-at="));
  const safePath = argsPath?.replace(/^[\\/]+/, "");
  const resolvedPath = path.resolve(dir, safePath ? safePath : "");
  let exclude: null | string[] = [];
  if (exFlag) {
    exclude = exFlag.split("=")[1]?.split(",") ?? [];
  }
  const zipName = `${path.basename(resolvedPath)}.zip`;
  let atPath = path.join(dir, zipName);
  if (atFlag) {
    const atValue = path.resolve(
      dir,
      atFlag.slice(4).replace(/^["']|["']$/g, ""),
    );
    const isDirectory =
      fs.existsSync(atValue) && fs.statSync(atValue).isDirectory();
    atPath = isDirectory ? path.join(atValue, zipName) : atValue;
  }
  try {
    console.log(color.loading("Zipping files..."));
    const stat = fs.statSync(resolvedPath);
    if (!stat.isDirectory() && !stat.isFile()) {
      throw new Error("Unsupported file type.");
    }
    if (stat.isSymbolicLink()) {
      throw new Error("Symbolic links are not supported.");
    }
    const zip = new AdmZip();
    function addToZip(source: string, relativePath: string) {
      const name = path.basename(source);
      const normalizedPath = relativePath.replace(/\\/g, "/");
      if (exclude?.includes(name) || exclude?.includes(normalizedPath)) {
        return;
      }
      const itemStat = fs.lstatSync(source);
      if (itemStat.isSymbolicLink()) return;
      if (itemStat.isDirectory()) {
        for (const entry of fs.readdirSync(source)) {
          const childSource = path.join(source, entry);
          const childRelative = path.posix.join(relativePath, entry);
          addToZip(childSource, childRelative);
        }
      } else if (itemStat.isFile()) {
        zip.addLocalFile(
          source,
          path.posix.dirname(relativePath) === "."
            ? ""
            : path.posix.dirname(relativePath),
        );
      }
    }
    if (stat.isDirectory()) {
      const rootName = path.basename(resolvedPath);
      for (const entry of fs.readdirSync(resolvedPath)) {
        addToZip(
          path.join(resolvedPath, entry),
          path.posix.join(rootName, entry),
        );
      }
    } else {
      addToZip(resolvedPath, path.basename(resolvedPath));
    }
    fs.mkdirSync(path.dirname(atPath), { recursive: true });
    zip.writeZip(atPath);
    console.log(`Zip Created: ${color.zipPath(atPath)}`);
  } catch (error) {
    console.error(`zip: '${dir}': ${error}`);
  }
}
