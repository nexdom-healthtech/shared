import SharedError from "@/models/shared-error.ts";

describe("SharedError", () => {
  it("should be a custom error", () => {
    const message = "Oops! Something went wrong.";
    const error = new SharedError(message);
    expect(error.name).toBe(`SharedError`);
    expect(error.message).toBe(message);
  });
});
