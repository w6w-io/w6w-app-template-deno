import type { ActionDefinition } from "@w6w/types";
import { ExampleClient } from "../lib/client.ts";

interface Input {
  message: string;
}

/**
 * POST /anything — the service echoes the request body back. Demonstrates a
 * write-style action with a JSON body.
 */
const echo: ActionDefinition<Input> = {
  key: "echo",
  type: "perform",
  resource: "message",
  title: "Echo Message",
  description: "Send a message and receive the same payload back.",
  params: [
    { key: "message", label: "Message", type: "string", required: true },
  ],
  output: [
    { key: "json", type: "object", label: "Echoed body" },
  ],

  async execute(input, ctx) {
    const client = new ExampleClient(ctx);
    return client.request("/anything", {
      method: "POST",
      body: { message: input.message },
    });
  },
};

export default echo;
