import fs from "fs";
import path from "path";

describe("Netlify SPA routing config", () => {
  it("includes a redirect rule for client-side routes", () => {
    const redirectsPath = path.join(process.cwd(), "public", "_redirects");
    const content = fs.readFileSync(redirectsPath, "utf8");

    expect(content).toContain("/* /index.html 200");
  });
});
