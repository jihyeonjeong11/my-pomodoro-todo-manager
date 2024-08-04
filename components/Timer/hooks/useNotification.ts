import { useEffect, useState } from "react";
import {
  isNotificationExists,
  launchNotification,
} from "@/components/Timer/functions";

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

  const launchCompleteNotification = (str: string) => {
    if (isPermitted) {
      launchNotification(`Your ${str} done!`);
    }
  };

  return { isPermitted, launchCompleteNotification };
};

export default useNotification;
