import dotenv from "dotenv";
import * as readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import { commandConfig } from "./config/command-config.js";
import { color } from "./config/color-config.js";

dotenv.config();

export const rl = readline.createInterface({
  input,
  output,
  prompt: `${color.root("fluoce")} ${process.cwd()}>`,
});

let isClosed = false;

rl.on("close", () => {
  isClosed = true;
});

rl.prompt();

rl.on("line", async (line) => {
  rl.pause();
  const [cmd, ...args] = line.trim().split(/\s+/);
  const conf = commandConfig.find((c) => c.command === cmd);
  if (conf) {
    try {
      await conf.function(args);
    } catch (e) {
      console.error(e);
    }
  } else if (cmd) {
    console.log(color.error(`Command not found: ${cmd}`));
  }
  if (isClosed) return;
  rl.prompt();
});
