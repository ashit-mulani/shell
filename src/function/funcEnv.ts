export function funcEnv(args: string[]) {
  const dir = process.cwd();
  const variableName = args[0];
  try {
    if (variableName) {
      const entry = Object.entries(process.env).find(
        ([key]) => key === variableName,
      );

      if (!entry) {
        console.error(`env: '${variableName}' not found`);
        return;
      }

      console.log(entry[1] ?? "");
    } else {
      const env = process.env;
      Object.entries(env)
        .sort(([a], [b]) => a.localeCompare(b))
        .forEach(([key, value]) => {
          console.log(`${key}=${value ?? ""}`);
        });
    }
    return;
  } catch (error) {
    console.error(`rm: '${dir}': ${error}`);
  }
}
