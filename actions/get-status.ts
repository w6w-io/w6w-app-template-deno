import type { ActionDefinition } from "@w6w/types";
import { ExampleClient } from "../lib/client.ts";

interface Input {
  code?: number;
}

/**
 * GET /status/{code} — pings the service with a status code and returns the
 * response. Useful as a smoke test for auth wiring.
 */
const getStatus: ActionDefinition<Input> = {
  key: "get-status",
  type: "read",
  resource: "status",
  title: "Get Status",
  description: "Fetch a status-code echo from the service.",
  params: [
    { key: "code", label: "Status Code", type: "number", hint: "Defaults to 200." },
  ],
  output: [
    { key: "url", type: "string", label: "URL" },
  ],

  async execute(input, ctx) {
    const client = new ExampleClient(ctx);
    return client.request(`/status/${input.code ?? 200}`);
  },
};

export default getStatus;
