import {combineReducers} from 'redux';

import {allItems} from './homeReducers/allItems';
import {banner} from './homeReducers/banner';
import {musics} from './homeReducers/musics';
import {movies} from './homeReducers/movies';
import {sports} from './homeReducers/sports';
import {radio} from './homeReducers/radio';

import {itemDetails} from './AVItemReducer/itemDetails';

export const mainReducer = combineReducers({
  allItems,
  banner,
  musics,
  movies,
  sports,
  radio,
  
  itemDetails,
});
