import {createAction} from "redux-actions";
import * as types from "./actionTypes";

export const reduceAssumptionTypes = createAction(
  types.ASSUMPTION_TYPES_DRAG.REDUCE,
  type =>  ({
    type,
  }),
);

export const resetDraggedAssumptionTypes = createAction(
  types.ASSUMPTION_TYPES_DRAG.RESET,
);
