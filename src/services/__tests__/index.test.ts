import * as services from "@/services/index.ts";

describe("services", () => {
  it("should be defined", () => {
    expect(services).not.toBeUndefined();
    expect(Object.keys(services).length).toBeGreaterThan(0);
  });
});
