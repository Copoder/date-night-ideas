import assert from "node:assert/strict";
import test from "node:test";
import worker, { canonicalRedirectUrl } from "../worker/index.js";

const ASSETS = {
  fetch(request: Request) {
    return Promise.resolve(new Response(new URL(request.url).pathname));
  }
};

test("redirects HTTP and www requests to the canonical HTTPS origin", async () => {
  const cases = [
    ["http://date-night-ideas.com/", "https://date-night-ideas.com/"],
    ["http://www.date-night-ideas.com/results/?source=test", "https://date-night-ideas.com/results/?source=test"],
    ["https://www.date-night-ideas.com/ideas/", "https://date-night-ideas.com/ideas/"]
  ];

  for (const [input, expected] of cases) {
    const response = await worker.fetch(new Request(input), { ASSETS });
    assert.equal(response.status, 308, input);
    assert.equal(response.headers.get("Location"), expected, input);
  }
});

test("passes canonical HTTPS and preview hosts through to assets", async () => {
  assert.equal(canonicalRedirectUrl(new Request("https://date-night-ideas.com/")), null);
  assert.equal(canonicalRedirectUrl(new Request("http://localhost:8787/")), null);

  const response = await worker.fetch(new Request("https://date-night-ideas.com/ideas/"), { ASSETS });
  assert.equal(response.status, 200);
  assert.equal(await response.text(), "/ideas/");
});
