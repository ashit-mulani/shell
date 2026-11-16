export async function funcClear(args: string[]) {
  process.stdout.write("\x1B[2J\x1B[H");
}
