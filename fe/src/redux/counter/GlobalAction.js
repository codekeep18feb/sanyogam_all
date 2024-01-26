// actions.js
export const setIncomingCall = (payload) => {
  return {
    type: "ADD_INCOMING_CALL",
    payload: payload,
  };
};
