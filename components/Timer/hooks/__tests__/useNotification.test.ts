// @ts-nocheck

import { renderHook } from "@testing-library/react";
import useNotification from "@/components/Timer/hooks/useNotification";

describe("useNotification()", () => {
  beforeAll(() => {
    global.Notification = {
      requestPermission: jest.fn().mockResolvedValue("granted"),
      permission: "default",
    };
  });

  it("should request notification permission", async () => {
    renderHook(() => useNotification());

    expect(Notification.requestPermission).toHaveBeenCalled();
  });
});
