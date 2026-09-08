import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const publisherId = "pub-5494088572540096";
const webAppRoot = [process.cwd(), resolve(process.cwd(), "web-app")].find(
  (candidate) =>
    existsSync(resolve(candidate, "index.html")) &&
    existsSync(resolve(candidate, "public")),
);

if (!webAppRoot) {
  throw new Error("Could not locate the web-app root for AdSense readiness tests");
}

describe("AdSense site readiness", () => {
  it("publishes the AdSense ownership meta tag in the document head", () => {
    const html = readFileSync(resolve(webAppRoot, "index.html"), "utf8");

    expect(html).toContain(
      `<meta name="google-adsense-account" content="ca-${publisherId}" />`,
    );
  });

  it("publishes the authorized seller declaration at the site root", () => {
    const adsText = readFileSync(resolve(webAppRoot, "public/ads.txt"), "utf8");

    expect(adsText).toBe(
      `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`,
    );
  });
});
