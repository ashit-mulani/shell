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
    const response = await fetch(url, {
      method,
      headers,
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
