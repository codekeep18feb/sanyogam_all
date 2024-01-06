"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// GlobalReducer.js
const initialState = {
  incoming_calls: [],
  notifications: []
};
const GlobalReducer = function () {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case "ADD_INCOMING_CALL":
      if (state.incoming_calls.length === 0) {
        console.log("how many times are we here", initialState.incoming_calls);
        return {
          ...state,
          incoming_calls: [...state.incoming_calls, action.payload]
        };
      }

    //   case 'LOGOUT':
    //     return {
    //       ...state,
    //       data: null,

    //     };
    default:
      return state;
  }
};
var _default = exports.default = GlobalReducer;