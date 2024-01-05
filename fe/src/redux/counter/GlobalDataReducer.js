// GlobalReducer.js
const initialState = {
    incoming_calls: [],
    notifications: [],
  }
  
  const GlobalReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_INCOMING_CALL':
        if (state.incoming_calls.length==0){
          console.log('how many times are we here',initialState.incoming_calls)
          return {
            ...state,
            incoming_calls: [
              ...state.incoming_calls,
              action.payload,
            ],
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
  
  export default GlobalReducer;