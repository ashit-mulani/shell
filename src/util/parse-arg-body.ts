export async function parseArgBody(
  value?: string,
): Promise<string | undefined> {
  if (value === undefined) return undefined;
  let body = value.trim();
  if (!body) {
    throw new Error("Request body cannot be empty");
  }
  if (
    (body.startsWith("'") && body.endsWith("'")) ||
    (body.startsWith('"') && body.endsWith('"'))
  ) {
    body = body.slice(1, -1);
  }
  try {
    await JSON.parse(body);
    return body;
  } catch {
    throw new Error("Invalid JSON request body");
  }
}
