import { emitCustomEvent, listenEvent } from "@/utils/event.ts";

describe("event", () => {
  vi.spyOn(window, "dispatchEvent");

  describe("emitCustomEvent", () => {
    it("should emit a custom event", () => {
      const type = "custom-event";
      const detail = { key: "value" };

      emitCustomEvent(type, detail);
      expect(window.dispatchEvent).toHaveBeenCalledOnce();
      expect(window.dispatchEvent).toHaveBeenCalledWith(expect.objectContaining({ type, detail }));
    });
  });

  describe("listenEvent and removeListener", () => {
    it("should listen for events and return a remove listener function", () => {
      const type = "random-event";
      const callback = vi.fn();

      const removeListener = listenEvent(type, callback);
      emitCustomEvent(type);
      expect(callback).toHaveBeenCalledOnce();

      removeListener();
      emitCustomEvent(type);
      expect(callback).toHaveBeenCalledOnce();
    });
  });
});
