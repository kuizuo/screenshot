import { assertEquals } from "https://deno.land/std@0.176.0/testing/asserts.ts";
import { screenshot } from "./utils/screenshot.ts";

Deno.test(async function test() {
  const filePath = "./screenshots/blog.png";

  try {
    await Deno.remove(filePath, { recursive: true });
  } catch (error) {
    console.log("File has been removed");
  }

  await screenshot("https://kuizuo.cn", "blog");

  const f = await Deno.open(filePath);
  const stat = await f.stat();

  f.close();
  assertEquals(stat.isFile, true);
});
