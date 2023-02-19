import { screenshot } from "./utils/screenshot.ts";

const url = Deno.args[0];
const name = Deno.args[1];

if (Deno.args.length == 0) {
  console.log("Usage: screenshot <url> <name>");
  Deno.exit(0);
}

const outDir = "./screenshots";

if (import.meta.main) {
  await screenshot(url, name, outDir);
}
