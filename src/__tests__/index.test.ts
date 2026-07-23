import { utils, models, services } from "@/index.ts";

describe("index", () => {
  it("should export utils", () => {
    expect(utils).not.toBeUndefined();
  });

  it("should export models", () => {
    expect(models).not.toBe(utils);
    expect(models).not.toBeUndefined();
  });

  it("should export services", () => {
    expect(services).not.toBe(utils);
    expect(services).not.toBe(models);
    expect(services).not.toBeUndefined();
  });
});
