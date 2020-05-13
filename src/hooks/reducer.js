import { handleLeft, handleRight, handleBoth } from "./actions";
import producer from "immer";

const mineReducer = (state, action) =>
  producer(state, (draft) => {
    switch (action.type) {
      case "LEFT_CLICK":
        console.log("step in left reducer");
        return handleLeft(draft, action.payload.pos);
      case "RIGHT_CLICK":
        console.log("step in right reducer");
        return handleRight(draft, action);
      case "BOTH_CLICK":
        return handleBoth(draft, action);
      default:
        return draft;
    }
  });

export default mineReducer;
