import { assert, assertEquals } from "@std/assert";
import { mockCtx } from "../_helpers.ts";
import auth from "../../auth/api-key.ts";

Deno.test("api-key sign: sets Authorization: Bearer <key>", async () => {
  const { ctx } = mockCtx([]);
  const request = { url: "https://httpbin.org/anything", method: "GET", headers: {} };
  const signed = await auth.sign!({ request, credential: { apiKey: "sk-test" } }, ctx);
  assertEquals(signed.headers["authorization"], "Bearer sk-test");
});

Deno.test("api-key test: succeeds when /status/200 responds 200", async () => {
  const { ctx } = mockCtx([{ status: 200, body: {} }]);
  const result = await auth.test!({ credential: { apiKey: "sk-test" } }, ctx);
  assert(result.ok);
});

Deno.test("api-key test: fails when credential is missing", async () => {
  const { ctx } = mockCtx([]);
  const result = await auth.test!({ credential: {} }, ctx);
  assertEquals(result.ok, false);
});
