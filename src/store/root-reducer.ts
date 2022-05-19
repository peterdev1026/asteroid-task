import { combineReducers } from '@reduxjs/toolkit';
import { reducer as dataReducer } from '../slices/data';

export const rootReducer = combineReducers({
  data: dataReducer
});
