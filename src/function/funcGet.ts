import { color } from "../config/color-config.js";
import { http } from "../util/http.js";
import { parseHeader } from "../util/parse-header.js";
import { parseResponse } from "../util/parse-response.js";

export async function funcGet(args: string[]) {
  const url = args.find((arg) => !arg.startsWith("-"));
  const headerArgs = args.filter((arg) => arg.startsWith("-h="));
  const pFlag = args.includes("-p");
  if (!url) {
    console.log(`GET: url is required, ex: GET your-url`);
    return;
  }
  try {
    const headers = parseHeader(headerArgs);
    console.log(color.loading(`GET fetching . . .`));
    const res = await http({
      url,
      method: "GET",
      headers,
    });
    if (pFlag) {
      await parseResponse(res);
    } else {
      console.log(res);
    }
  } catch (error) {
    console.error(`${color.error(error)}`);
  }
}
