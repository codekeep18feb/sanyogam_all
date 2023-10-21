// store.js
import { createStore,applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './root-reducer';

// const store = createStore(rootReducer);
const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(/* Your middleware here */)
    )
  );
export default store;