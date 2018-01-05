import { combineReducers } from 'redux';
import { reducer as storageMergeReducer } from 'redux-storage';
import { reducers } from 'armory-component-ui';

export default storageMergeReducer(combineReducers({
  ...reducers,
}));
