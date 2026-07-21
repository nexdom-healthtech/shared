import * as models from "@/models/index.ts";

describe("models", () => {
  it("should be defined", () => {
    expect(models).not.toBeUndefined();
    expect(Object.keys(models).length).toBeGreaterThan(0);
  });
});
