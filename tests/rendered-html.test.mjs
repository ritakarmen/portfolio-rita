import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders Rita Ortiz's portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Rita Ortiz \| Desarrolladora Front-End<\/title>/i);
  assert.match(html, /Rita Carmen Ortiz Ochoa/);
  assert.match(html, /Experiencia que conecta/);
  assert.match(html, /Tecnología con/);
  assert.match(html, /ritacarmenortiz@gmail\.com/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("removes all disposable starter preview code", async () => {
  const packageJson = await readFile(
    new URL("../package.json", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  const previewFiles = await readdir(
    new URL("../app/_sites-preview", import.meta.url),
  );
  assert.deepEqual(previewFiles, []);
});
