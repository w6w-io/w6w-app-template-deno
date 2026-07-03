import { assertEquals } from "@std/assert";
import { mockCtx } from "../_helpers.ts";
import action from "../../actions/get-status.ts";

Deno.test("get-status: GETs /status/200 by default", async () => {
  const { ctx, calls } = mockCtx([{ body: { url: "https://httpbin.org/status/200" } }]);
  await action.execute!({}, ctx);
  assertEquals(calls[0].method, "GET");
  assertEquals(new URL(calls[0].url).pathname, "/status/200");
});

Deno.test("get-status: forwards custom code", async () => {
  const { ctx, calls } = mockCtx([{ body: {} }]);
  await action.execute!({ code: 418 }, ctx);
  assertEquals(new URL(calls[0].url).pathname, "/status/418");
});
