import { handleLeft, handleRight, handleBoth } from "./actions";

const mineReducer = (state, action) => {
  switch (action.type) {
    case "LEFT_CLICK":
      return handleLeft(state, action.payload.pos);
    case "RIGHT_CLICK":
      console.log("step in right reducer");
      return handleRight(state, action);
    case "BOTH_CLICK":
      return handleBoth(state, action);
    default:
      return state;
  }
};

export default mineReducer;
