import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";
import { Image } from "https://deno.land/x/imagescript@v1.2.14/mod.ts";
import { join } from "https://deno.land/std@0.137.0/path/mod.ts";

export async function screenshot(
  url: string,
  name: string,
  outDir = "./screenshots",
) {
  if (!(url.match(/^http[s]?:\/\//)) || !url) {
    console.log("Provided URL is Broken or Wrong");
    return;
  }

  if (!name) {
    console.log("Provide name to Process");
    return;
  }

  const browser = await puppeteer.launch({
    defaultViewport: { width: 1200, height: 675 },
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });
  const raw = await page.screenshot();

  await browser.close();

  if (!(raw instanceof Uint8Array)) {
    console.log("Invalid Image");
    Deno.exit(0);
  }

  // convert to png
  const image = await Image.decode(raw);

  // if output directory doesn't exist, create it
  try {
    const directory = await Deno.stat(outDir);

    if (!directory.isDirectory) {
      throw new Error("Output directory is not a directory");
    }
  } catch (error) {
    await Deno.mkdir(outDir, { recursive: true });
  }

  const png = join(outDir, `${name}.png`);
  await Deno.writeFile(png, await image.encode(80));

  console.log(`Screenshot saved to ${join(Deno.cwd(), png)}`);
}
