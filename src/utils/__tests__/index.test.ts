import * as utils from "@/utils/index.ts";

describe("utils", () => {
  it("should be defined", () => {
    expect(utils).not.toBeUndefined();
    expect(Object.keys(utils).length).toBeGreaterThan(0);
  });
});
