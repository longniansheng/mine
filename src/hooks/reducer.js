import producer from "immer";
import { handleLeft, handleRight, handleBoth } from "./actions";

const mineReducer = (state, action) =>
  producer(state, (draft) => {
    switch (action.type) {
      case "LEFT_CLICK":
        return handleLeft(draft, action);
      case "RIGHT_CLICK":
        return handleRight(draft, action);
      case "BOTH_CLICK":
        return handleBoth(draft, action);
      default:
        return state;
    }
  });

export default mineReducer;
