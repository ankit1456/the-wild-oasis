import { useEffect, useRef } from "react";

function useClickOutside<T extends HTMLElement>(
  handler: () => void,
  listenCapturing = true
) {
  const clickOutsideRef = useRef<T>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        clickOutsideRef.current &&
        !clickOutsideRef.current.contains(e.target as Node)
      ) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, {
      capture: listenCapturing,
    });

    return () =>
      document.removeEventListener("click", handleClick, {
        capture: listenCapturing,
      });
  }, [handler, listenCapturing]);

  return clickOutsideRef;
}

export default useClickOutside;
