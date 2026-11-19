import { color } from "../config/color-config.js";
import { http } from "../util/http.js";
import { parseArgBody } from "../util/parse-arg-body.js";
import { parseHeader } from "../util/parse-header.js";
import { parseResponse } from "../util/parse-response.js";

export async function funcPost(args: string[]) {
  const url = args.find((arg) => !arg.startsWith("-"));
  const headerArgs = args.filter((arg) => arg.startsWith("-h="));
  const bodyArg = args.find((arg) => arg.startsWith("-b="));
  const pFlag = args.includes("-p");
  if (!url) {
    console.log(`POST: url is required, ex: POST your-url`);
    return;
  }
  try {
    console.log(color.loading(`POST fetching . . .`));
    const headers = parseHeader(headerArgs);
    const body = await parseArgBody(bodyArg?.slice(3));
    const res = await http({
      url,
      method: "POST",
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
