import { useReducer, useMemo } from "react";
import _ from "lodash";
import reducer from "./reducer";
import { initMines } from "../utils";

export default function useMineHooks() {
  const mines = useMemo(() => initMines(), []);

  const [data, dispatch] = useReducer(reducer, {
    mines,
    gameOver: false,
    visited: {},
  });

  const handleClick = _.throttle((e, x, y) => {
    const buttons = e.buttons;
    switch (buttons) {
      case 1:
        console.log("step in left click");
        dispatch({ type: "LEFT_CLICK", payload: { pos: [x, y] } });
        break;
      case 2:
        console.log("step in right click");
        dispatch({ type: "RIGHT_CLICK", payload: { pos: [x, y] } });
        break;
      case 3:
        console.log("step in both click");
        dispatch({ type: "BOTH_CLICK", payload: { pos: [x, y] } });
        break;
      default:
        break;
    }
  }, 100);

  return { data, handleClick };
}
