import { setupServer } from "msw/node";
import pingHandlers from "@mocks/ping/index.ts";

export const server = setupServer(...pingHandlers);
