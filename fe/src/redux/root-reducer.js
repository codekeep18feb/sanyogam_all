// reducers.js
import { combineReducers } from 'redux';
import counterReducer from './counter/counter-reducer'; // Import your counterReducer here
import AuthReducer from './counter/AuthReducer'; // Import your counterReducer here
import GlobalDataReducer from './counter/GlobalDataReducer'
const rootReducer = combineReducers({
  counter: counterReducer, // You can give it any key you like
  auth:AuthReducer,
  globalData:GlobalDataReducer
  // Add other reducers if needed
});

export default rootReducer;