import { useEffect } from "react";

export default function useOutsideClick(ref, cb, exceptionId) {
  useEffect(() => {
    function handelOutsideClick(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.id !== exceptionId
      )
        cb();
    }
    document.addEventListener("mousedown", handelOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handelOutsideClick);
    };
  }, [ref]);
}
