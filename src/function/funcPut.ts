import { color } from "../config/color-config.js";
import { http } from "../util/http.js";
import { parseHeader } from "../util/parse-header.js";
import { parseResponse } from "../util/parse-response.js";

export async function funcPut(args: string[]) {
  const url = args.find((arg) => !arg.startsWith("-"));
  const headerArgs = args.filter((arg) => arg.startsWith("-h="));
  const bodyArg = args.find((arg) => arg.startsWith("-b="));
  const pFlag = args.includes("-p");
  const body = bodyArg?.slice(3);
  if (!url) {
    console.log(`PUT: url is required, ex: PUT your-url`);
    return;
  }
  try {
    const headers = parseHeader(headerArgs);
    console.log(color.loading(`PUT fetching . . .`));
    const res = await http({
      url,
      method: "PUT",
      headers,
      body,
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
