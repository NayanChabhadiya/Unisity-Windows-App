import { useEffect, useRef } from "react";

export function useKey(key, cb) {
  const callback = useRef(cb);

  useEffect(() => {
    callback.current = cb;
    // eslint-disable-next-line
  });

  useEffect(() => {
    function handle(event) {
      if (event.code === key) {
        callback.current(event);
      }
    }

    document.addEventListener("keypress", handle);
    return () => document.removeEventListener("keypress", handle);
    // eslint-disable-next-line
  }, [key]);
}
