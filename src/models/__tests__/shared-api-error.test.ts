import SharedApiError from "@/models/shared-api-error.ts";
import SharedError from "@/models/shared-error.ts";

describe("SharedApiError", () => {
  it("should be a custom API error", () => {
    const message = "Oops! Something went wrong.";
    const status = 404;
    const body = { error: true };
    const error = new SharedApiError(message, { status, body });
    expect(error).toBeInstanceOf(SharedError);
    expect(error.name).toBe(`SharedApiError`);
    expect(error.message).toBe(message);
    expect(error.status).toBe(status);
    expect(error.body).toBe(body);
  });
});
