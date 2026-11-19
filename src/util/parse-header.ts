export function parseHeader(headerArgs: string[]): Record<string, string> {
  const headers: Record<string, string> = {};
  for (const flag of headerArgs) {
    const raw = flag.slice(3);
    const idx = raw.indexOf(":");
    if (idx === -1) {
      throw new Error(`Invalid header "${raw}". Use -h="Key: Value"`);
    }
    const key = raw.slice(0, idx).trim();
    const value = raw.slice(idx + 1).trim();
    if (!key) {
      throw new Error(`Empty header name in "${raw}"`);
    }
    if (!value) {
      throw new Error(`Empty header value in "${key}"`);
    }
    headers[key] = value;
  }
  return headers;
}
