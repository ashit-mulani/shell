import { commandConfig } from "../config/command-config.js";

export function funcHelp() {
  console.log(" ");
  console.log("Available commands:\n");
  const width = Math.max(...commandConfig.map((c) => c.command.length));
  for (const c of commandConfig) {
    console.log(`  ${c.command.padEnd(width)}  ${c.description}`);
  }
  console.log(" ");
}
