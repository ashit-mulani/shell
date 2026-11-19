import { color } from "../config/color-config.js";

export async function parseResponse(response: Response) {
  console.log("");
  const statusColor = response.ok ? color.success : color.error;
  console.log(color.dim("--- metadata ---"));
  console.log(`${statusColor(`${response.status} ${response.statusText}`)}`);
  console.log(`URL: ${response.url}`);
  console.log(`Redirected: ${response.redirected}`);
  console.log(color.dim("\n--- Headers ---"));
  response.headers.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });
  console.log(color.dim("\n--- Response Body ---"));
  const text = await response.text();
  if (!text) {
    console.log("(Empty response)");
    return;
  }
  try {
    const data = JSON.parse(text);
    console.log(JSON.stringify(data, null, 2));
  } catch {
    console.log(text);
  }
  console.log("");
}
