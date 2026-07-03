import { assertEquals } from "@std/assert";
import { mockCtx } from "../_helpers.ts";
import action from "../../actions/echo.ts";

Deno.test("echo: POSTs the message as JSON", async () => {
  const { ctx, calls } = mockCtx([{ body: { json: { message: "hi" } } }]);
  await action.execute!({ message: "hi" }, ctx);
  assertEquals(calls[0].method, "POST");
  assertEquals(new URL(calls[0].url).pathname, "/anything");
  assertEquals(calls[0].headers["content-type"], "application/json");
  assertEquals(JSON.parse(calls[0].body ?? ""), { message: "hi" });
});
