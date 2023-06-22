export * from './homeReducers';
export * from './AVItemReducer';

import {combineReducers} from 'redux';

import {radio, allItems, banner, musics, movies, sports} from './homeReducers';
import {itemDetails} from './AVItemReducer';

export const mainReducer = combineReducers({
  allItems,
  banner,
  musics,
  movies,
  sports,
  radio,

  itemDetails,
});
