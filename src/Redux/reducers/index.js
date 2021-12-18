

import { combineReducers } from 'redux';
import {allItems} from './allItems'
import {banner} from './banner'

export const mainReducer = combineReducers({
  allItems,
  banner,
})