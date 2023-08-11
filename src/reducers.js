// reducers.js
import { combineReducers } from 'redux';
import counterReducer from './components/Profile/counterReducer';

const rootReducer = combineReducers({
  count: counterReducer,
});

export default rootReducer;
