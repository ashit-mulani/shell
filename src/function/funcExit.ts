import { rl } from "../index.js";

export async function funcExit(args: string[]) {
  rl.close();
}
