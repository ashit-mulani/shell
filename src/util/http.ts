export async function http({
  url,
  method,
  body,
  headers = {},
}: {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string | undefined;
  headers?: Record<string, string>;
}) {
  try {
    const requestHeaders = new Headers(headers);
    if (body && !requestHeaders.has("Content-Type")) {
      requestHeaders.set("Content-Type", "application/json");
    }
    if (!requestHeaders.has("Accept")) {
      requestHeaders.set("Accept", "application/json");
    }
    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: body ?? null,
    });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${method} - Request failed: ${error.message}`);
    }
    throw error;
  }
}
