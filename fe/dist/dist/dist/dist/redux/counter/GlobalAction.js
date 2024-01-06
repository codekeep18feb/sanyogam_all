"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setIncomingCall = void 0;
// actions.js
const setIncomingCall = payload => {
  return {
    type: "ADD_INCOMING_CALL",
    payload: payload
  };
};
exports.setIncomingCall = setIncomingCall;