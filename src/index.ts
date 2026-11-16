import * as readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import { commandConfig } from "./config/command-config.js";
import { color } from "./config/color-config.js";

const rl = readline.createInterface({
  input,
  output,
  prompt: `${color.root(process.cwd())}> `,
});

rl.prompt();

rl.on("line", async (line) => {
  const [cmd, ...args] = line.trim().split(/\s+/);
  if (cmd == "exit") {
    rl.close();
    return;
  }
  const conf = commandConfig.find((c) => c.command === cmd);
  if (conf) {
    try {
      await conf.function(args);
    } catch (e) {
      console.error(e);
    }
  }
  rl.prompt();
});
