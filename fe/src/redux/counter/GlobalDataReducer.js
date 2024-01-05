// AuthReducer.js
const initialState = {
    incoming_calls: [],
    notifications: [],
  }
  
  const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_INCOMING_CALL':
        return {
            ...state,
            incoming_calls: [
              ...state.incoming_calls,
              action.payload["incoming_calls"],
            ],
          };
    //   case 'LOGOUT':
    //     return {
    //       ...state,
    //       data: null,
  
    //     };
      default:
        return state;
    }
  };
  
  export default AuthReducer;