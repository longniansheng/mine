import { useEffect } from "react";

export default function useContextMenuHooks() {
  useEffect(() => {
    document.oncontextmenu = function (e) {
      e = e || window.event;
      return false;
    };
  }, []);
}
