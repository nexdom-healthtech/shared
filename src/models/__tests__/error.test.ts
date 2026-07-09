import SharedError from "@/models/error.ts";

describe("error", () => {
  it("should ad a prefix to messages", () => {
    const message = "Oops! Something went wrong.";
    const error = new SharedError(message);
    expect(error.message).toBe(`[shared]: ${message}`);
  });
});
