import { useEffect } from "react";

export default function useContextMenuHooks() {
  useEffect(() => {
    function cancel(e) {
      e.preventDefault();
      return false;
    }

    document.addEventListener("contextmenu", cancel, true);

    return () => document.removeEventListener("contextmenu", cancel);
  }, []);
}
