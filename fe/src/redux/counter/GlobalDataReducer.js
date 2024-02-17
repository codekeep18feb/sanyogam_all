// GlobalReducer.js
const initialState = {};

const GlobalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCOMING":
      return {
        ...state,
        ...action.payload
      };
    case "ACCEPTED_INCOMING":
      return {
        ...state,
        ...action.payload
      };

 
    default:
      return state;
  }
};

export default GlobalReducer;
