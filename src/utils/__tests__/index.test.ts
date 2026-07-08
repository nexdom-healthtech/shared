import utils from "@/utils/index.ts";

describe("utils", () => {
  it("should be defined", () => {
    expect(utils).not.toBeUndefined();
    expect(utils.text).not.toBeUndefined();
    expect(utils.event).not.toBeUndefined();
    expect(utils.dateTime).not.toBeUndefined();
    expect(utils.number).not.toBeUndefined();
  });
});
