import { useEffect, useState } from "react";
import { isNotificationExists } from "../functions";

/**
 * Custom hook for handling notification.
 * @returns {{ isPermitted: boolean }} An object containing the permission status.
 * @example
 * ```tsx
 * const { isPermitted } = useNotification()
 * ```
 */

const useNotification = () => {
  const [isPermitted, setIsPermitted] = useState(false);

  useEffect(() => {
    if (isNotificationExists()) {
      Notification.requestPermission((result) => {
        if (result === "granted") {
          setIsPermitted(true);
        }
      });
    }
  }, []);

  return { isPermitted };
};

export default useNotification;
