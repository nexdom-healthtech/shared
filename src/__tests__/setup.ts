import { server } from "@mocks/server.ts";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
  vi.useFakeTimers();
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "log").mockImplementation(() => {});
});

beforeEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());
