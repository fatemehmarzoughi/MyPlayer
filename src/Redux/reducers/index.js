

import { combineReducers } from 'redux';
import { allItems } from './allItems';
import { banner } from './banner';
import { musics } from './musics';
import { movies } from './movies';
import { sports } from './sports'

export const mainReducer = combineReducers({
  allItems,
  banner,
  musics,
  movies,
  sports,
})