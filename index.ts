import type { AppDefinition } from "@w6w/types";
import apiKey from "./auth/api-key.ts";
import getStatus from "./actions/get-status.ts";
import echo from "./actions/echo.ts";

export default {
  actions: [getStatus, echo],
  auth: [apiKey],
} satisfies AppDefinition;
